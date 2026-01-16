import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
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

    const formatDate = (d: string) => {
        if (!d) return '';
        return new Date(d).toISOString().split('T')[0];
    };

    const openModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEmployee(null);
        setIsModalOpen(false);
    };

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

    useEffect(() => {
        fetchEmployees();
    }, [search]);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchEmployees(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Head title="Employee Records" />

                {/* FILTERS */}
                <form className="mb-4 flex gap-2" onSubmit={handleFilter}>
                    <input
                        type="text"
                        placeholder="Search employee name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 rounded border p-2"
                    />

                    <button
                        type="submit"
                        className="rounded-2xl bg-blue-500 px-4 py-2 text-white"
                    >
                        Filter
                    </button>

                    <Link
                        href={'/employees/create'}
                        className='className="rounded hover:bg-green-600" rounded-2xl bg-green-500 px-4 py-2 text-white'
                    >
                        Register
                    </Link>
                </form>

                {/* TABLE */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
                            <table className="w-full min-w-[900px] text-left text-sm">
                                <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-gray-600 uppercase dark:text-gray-300">
                                            Id
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-gray-600 uppercase dark:text-gray-300">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-gray-600 uppercase dark:text-gray-300">
                                            Position
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-gray-600 uppercase dark:text-gray-300">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-gray-600 uppercase dark:text-gray-300">
                                            Contact No
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-gray-600 uppercase dark:text-gray-300">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {employees.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="py-6 text-center text-gray-500 dark:text-gray-400"
                                            >
                                                No employees found
                                            </td>
                                        </tr>
                                    ) : (
                                        employees.data.map((emp) => (
                                            <tr
                                                key={emp.id}
                                                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                                                    {emp.id}
                                                </td>
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                                                    {emp.name}{' '}
                                                </td>

                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                    {emp.designation}
                                                </td>

                                                <td className="px-4 py-3">
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
                                                </td>

                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                    {emp.contact_no}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() =>
                                                            openModal(emp)
                                                        }
                                                        className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* MODAL */}
                        {isModalOpen && selectedEmployee && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div
                                    className="bg-opacity-50 absolute inset-0 bg-black backdrop-blur-sm"
                                    onClick={closeModal}
                                />

                                <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                        Employee Details
                                    </h2>

                                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                        <p>
                                            <strong>Name:</strong>{' '}
                                            {selectedEmployee.name}{' '}
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
