import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Employees', href: '/employees' },
    { title: 'Register', href: '/employees/create' },
];

export default function EmployeeCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        designation: '',
        email: '',
        contact_no: '',
        date_hired: '',
        status: '',
        sss_no: '',
        gsis_no: '',
        phil_health_no: '',
        tin_no: '',
        pag_ibig_no: '',
        salary_rate: '',
        img_status: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/employees', {
            onSuccess: () => {
                setSuccessMessage('Employee registered successfully!');
                reset(
                    'name',
                    'designation',
                    'email',
                    'contact_no',
                    'date_hired',
                    'status',
                    'sss_no',
                    'gsis_no',
                    'phil_health_no',
                    'tin_no',
                    'pag_ibig_no',
                    'salary_rate',
                    'img_status',
                );
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register Employee" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Register Employee
                </h1>

                {successMessage && (
                    <div className="mb-4 rounded bg-green-100 p-2 text-green-700">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={submit} className="grid grid-cols-4 gap-4">
                    {/* Name */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.name && (
                            <div className="text-sm text-red-500">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Designation
                        </label>
                        <select
                            value={data.designation}
                            onChange={(e) =>
                                setData('designation', e.target.value)
                            }
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">-- Select --</option>
                            <option value="Administration">
                                Administration
                            </option>
                            <option value="Enforcement">Enforcement</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                        {errors.designation && (
                            <div className="text-sm text-red-500">
                                {errors.designation}
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.email && (
                            <div className="text-sm text-red-500">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Contact No */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Contact No
                        </label>
                        <input
                            type="text"
                            value={data.contact_no}
                            onChange={(e) =>
                                setData('contact_no', e.target.value)
                            }
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.contact_no && (
                            <div className="text-sm text-red-500">
                                {errors.contact_no}
                            </div>
                        )}
                    </div>

                    {/* Date Hired */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Date Hired
                        </label>
                        <input
                            type="date"
                            value={data.date_hired}
                            onChange={(e) =>
                                setData('date_hired', e.target.value)
                            }
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.date_hired && (
                            <div className="text-sm text-red-500">
                                {errors.date_hired}
                            </div>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Status
                        </label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">-- Select --</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {errors.status && (
                            <div className="text-sm text-red-500">
                                {errors.status}
                            </div>
                        )}
                    </div>

                    {/* SSS */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            SSS No
                        </label>
                        <input
                            type="text"
                            value={data.sss_no}
                            onChange={(e) => setData('sss_no', e.target.value)}
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.sss_no && (
                            <div className="text-sm text-red-500">
                                {errors.sss_no}
                            </div>
                        )}
                    </div>

                    {/* GSIS */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            GSIS No
                        </label>
                        <input
                            type="text"
                            value={data.gsis_no}
                            onChange={(e) => setData('gsis_no', e.target.value)}
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.gsis_no && (
                            <div className="text-sm text-red-500">
                                {errors.gsis_no}
                            </div>
                        )}
                    </div>

                    {/* PhilHealth */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            PhilHealth No
                        </label>
                        <input
                            type="text"
                            value={data.phil_health_no}
                            onChange={(e) =>
                                setData('phil_health_no', e.target.value)
                            }
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.phil_health_no && (
                            <div className="text-sm text-red-500">
                                {errors.phil_health_no}
                            </div>
                        )}
                    </div>

                    {/* TIN */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            TIN No
                        </label>
                        <input
                            type="text"
                            value={data.tin_no}
                            onChange={(e) => setData('tin_no', e.target.value)}
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.tin_no && (
                            <div className="text-sm text-red-500">
                                {errors.tin_no}
                            </div>
                        )}
                    </div>

                    {/* Pag-IBIG */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Pag-IBIG No
                        </label>
                        <input
                            type="text"
                            value={data.pag_ibig_no}
                            onChange={(e) =>
                                setData('pag_ibig_no', e.target.value)
                            }
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.pag_ibig_no && (
                            <div className="text-sm text-red-500">
                                {errors.pag_ibig_no}
                            </div>
                        )}
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Salary Rate
                        </label>
                        <input
                            type="number"
                            value={data.salary_rate}
                            onChange={(e) =>
                                setData('salary_rate', e.target.value)
                            }
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.salary_rate && (
                            <div className="text-sm text-red-500">
                                {errors.salary_rate}
                            </div>
                        )}
                    </div>

                    {/* Img Status */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
                            Image Status
                        </label>
                        <input
                            type="text"
                            value={data.img_status}
                            onChange={(e) =>
                                setData('img_status', e.target.value)
                            }
                            className="w-full rounded border p-2 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.img_status && (
                            <div className="text-sm text-red-500">
                                {errors.img_status}
                            </div>
                        )}
                    </div>

                    <div className="col-span-2 mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
