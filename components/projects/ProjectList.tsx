'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import io from 'socket.io-client';
import ProjectDetails from './ProjectDetails';
import EditProjectForm from './EditProjectForm';

interface Project {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    description: string;
}

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const currentProjects = projects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );

    useEffect(() => {
        const socket = io();

        const connectSocket = async () => {
            await fetch('/api/projects-socket');
            socket.on('project-updated', (data: Project) => {
                setProjects(prevProjects => {
                    const updatedProjects = [...prevProjects];
                    const index = updatedProjects.findIndex(p => p.id === data.id);
                    if (index !== -1) {
                        updatedProjects[index] = { ...updatedProjects[index], ...data };
                    }
                    return updatedProjects;
                });
            });
        };

        connectSocket();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error('Expected an array, but received:', data);
                    setProjects([]);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects([]);
            }
        };

        fetchProjects();
    }, []);

    const handleView = (project: Project) => {
        setSelectedProject(project);
        setIsEditing(false);
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/projects/delete?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProjects(projects.filter(project => project.id !== id));
            } else {
                console.error('Error deleting project:', await response.json());
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleSave = () => {
        setSelectedProject(null);
        setIsEditing(false);
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error('Expected an array, but received:', data);
                    setProjects([]);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects([]);
            }
        };

        fetchProjects();
    };

    const handleCancel = () => {
        setSelectedProject(null);
        setIsEditing(false);
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>اسم المشروع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>تاريخ البدء</TableHead>
                        <TableHead>تاريخ الانتهاء</TableHead>
                        <TableHead>الإجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentProjects.map((project) => (
                        <React.Fragment key={project.id}>
                            <TableRow>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>
                                    <Badge variant={project.status === 'مكتمل' ? 'success' : project.status === 'قيد التنفيذ' ? 'warning' : 'secondary'}>
                                        {project.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleView(project)}>تفاصيل</Button>
                                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(project)}>تعديل</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>حذف</Button>
                                </TableCell>
                            </TableRow>
                            {selectedProject && selectedProject.id === project.id && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        {isEditing ? (
                                            <EditProjectForm key={`edit-${project.id}`} project={selectedProject} onSave={handleSave} onCancel={handleCancel} />
                                        ) : (
                                            <ProjectDetails key={`view-${project.id}`} project={selectedProject} onClose={() => setSelectedProject(null)} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
                <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" /> السابق
                </Button>
                <span className="text-gray-900">صفحة {currentPage} من {totalPages}</span>
                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    التالي <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
