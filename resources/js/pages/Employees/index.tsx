import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { FolderSymlink } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employee Records',
        href: '/employees',
    },
];

interface Employee {
    id: number;
    name: string;
    email: string;
    designation: string;
    status: string;
    created_at: string;
    contact_no: string;
}

interface EmployeeResponse {
    data: Employee[];
    current_page: number;
    last_page: number;
}

export default function Employees() {
    const [employees, setEmployees] = useState<EmployeeResponse>({
        data: [],
        current_page: 1,
        last_page: 1,
    });

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ Safe date formatter (local time)
    const formatDate = (date: string) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    };

    const openModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEmployee(null);
        setIsModalOpen(false);
    };

    // ✅ Proper useCallback
    const fetchEmployees = useCallback(
        async (page = 1) => {
            setLoading(true);

            try {
                const response = await axios.get('/api/employees', {
                    params: { search, page },
                });

                setEmployees({
                    data: response.data.data ?? [],
                    current_page: response.data.current_page ?? 1,
                    last_page: response.data.last_page ?? 1,
                });
            } catch (err) {
                console.error(err);
                setEmployees({ data: [], current_page: 1, last_page: 1 });
            } finally {
                setLoading(false);
            }
        },
        [search],
    );

    // ✅ ESLint-safe dependency
    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchEmployees(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Head title="Employee Records" />

                {/* FILTER */}
                <form className="mb-4 flex gap-2" onSubmit={handleFilter}>
                    <Input
                        type="text"
                        placeholder="Search employee name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1"
                    />

                    <Link href="/employees/create">
                        <Button>
                            <FolderSymlink className="mr-2 h-4 w-4" />
                            Add Employee
                        </Button>
                    </Link>
                </form>

                {/* TABLE */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="w-full overflow-x-auto rounded-xl border shadow-sm">
                            <Table>
                                <TableCaption>List of Employees</TableCaption>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Contact No</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {employees.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                className="py-6 text-center text-gray-500"
                                            >
                                                No employees found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        employees.data.map((emp) => (
                                            <TableRow
                                                key={emp.id}
                                                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                            >
                                                <TableCell className="font-medium">
                                                    {emp.id}
                                                </TableCell>

                                                <TableCell className="font-medium">
                                                    {emp.name}
                                                </TableCell>

                                                <TableCell>
                                                    {emp.designation}
                                                </TableCell>

                                                <TableCell>
                                                    <span
                                                        className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                                                            emp.status ===
                                                            'Active'
                                                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                                        }`}
                                                    >
                                                        {emp.status}
                                                    </span>
                                                </TableCell>

                                                <TableCell>
                                                    {emp.contact_no}
                                                </TableCell>

                                                <TableCell>
                                                    <button
                                                        onClick={() =>
                                                            openModal(emp)
                                                        }
                                                        className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                                                    >
                                                        View
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* MODAL */}
                        {isModalOpen && selectedEmployee && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                                    onClick={closeModal}
                                />

                                <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
                                    <h2 className="mb-4 text-xl font-semibold">
                                        Employee Details
                                    </h2>

                                    <div className="space-y-2">
                                        <p>
                                            <strong>Name:</strong>{' '}
                                            {selectedEmployee.name}
                                        </p>
                                        <p>
                                            <strong>Email:</strong>{' '}
                                            {selectedEmployee.email}
                                        </p>
                                        <p>
                                            <strong>Position:</strong>{' '}
                                            {selectedEmployee.designation}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{' '}
                                            {selectedEmployee.status}
                                        </p>
                                        <p>
                                            <strong>Date Added:</strong>{' '}
                                            {formatDate(
                                                selectedEmployee.created_at,
                                            )}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={closeModal}
                                            className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PAGINATION */}
                        <div className="mt-4 flex justify-between">
                            {employees.current_page > 1 && (
                                <button
                                    onClick={() =>
                                        fetchEmployees(
                                            employees.current_page - 1,
                                        )
                                    }
                                    className="rounded bg-accent px-3 py-1"
                                >
                                    Previous
                                </button>
                            )}

                            {employees.current_page < employees.last_page && (
                                <button
                                    onClick={() =>
                                        fetchEmployees(
                                            employees.current_page + 1,
                                        )
                                    }
                                    className="rounded bg-accent px-3 py-1"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
