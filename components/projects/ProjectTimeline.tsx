'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function ProjectTimeline() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const projects = await response.json();
                const events = projects.map((project) => ({
                    id: project.id,
                    title: project.name,
                    start: new Date(project.startDate),
                    end: new Date(project.endDate),
                    status: project.status,  // Add status to differentiate projects
                }));
                setEvents(events);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="h-[600px] p-4 bg-white shadow-lg border-2 border-gray-200 rounded-lg">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                tooltipAccessor="title"
                style={{ height: '100%', padding: '20px' }}
                className="shadow-lg border-2 border-blue-500 rounded-lg"
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.status === 'مكتمل' ? '#4CAF50' : event.status === 'قيد التنفيذ' ? '#FFC107' : '#03A9F4',
                        borderRadius: '5px',
                        padding: '5px',
                        color: 'white',
                        border: 'none',
                        display: 'block',
                    },
                })}
                components={{
                    event: (props) => (
                        <div className="flex items-center">
                            <span>{props.title}</span>
                        </div>
                    ),
                    toolbar: ({ onNavigate, label }) => (
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => onNavigate('PREV')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                السابق
                            </button>
                            <span className="text-lg font-semibold">{label}</span>
                            <button onClick={() => onNavigate('NEXT')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                التالي
                            </button>
                        </div>
                    ),
                }}
            />
        </div>
    );
}
