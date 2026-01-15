import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Accidents', href: '/accidents' },
];

interface Accident {
    id: number;
    code: string;
    date_time: string;
    location: string;
    damage: number;
    fatality: number;
    injured: number;
    cctv: string;
    involved: string;
    operator_id: number;
    single: number;
    sedan: number;
    truck: number;
    puj: number;
    tricycle: number;
    bus: number;
    suv: number;
    operator_name: string;
}

interface AccidentResponse {
    data: Accident[];
    current_page: number;
    last_page: number;
}

export default function Accidents() {
    const [accidents, setAccidents] = useState<AccidentResponse>({
        data: [],
        current_page: 1,
        last_page: 1,
    });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedAccident, setSelectedAccident] = useState<Accident | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    const openViewModal = (accident: Accident) => {
        setSelectedAccident(accident);
        setIsModalOpen(true);
    };

    const closeViewModal = () => {
        setSelectedAccident(null);
        setIsModalOpen(false);
    };

    const fetchAccidents = useCallback(
        async (page = 1) => {
            setLoading(true);
            try {
                const response = await axios.get('/api/accidents', {
                    params: { search, page },
                });

                setAccidents({
                    data: response.data.data ?? [],
                    current_page: response.data.current_page ?? 1,
                    last_page: response.data.last_page ?? 1,
                });
            } catch (err) {
                console.error(err);
                setAccidents({ data: [], current_page: 1, last_page: 1 });
            } finally {
                setLoading(false);
            }
        },
        [search],
    );

    useEffect(() => {
        fetchAccidents();
    }, [search]);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchAccidents(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Head title="Accidents" />

                {/* Filter */}
                <form className="mb-4 flex gap-2" onSubmit={handleFilter}>
                    <input
                        type="text"
                        placeholder="Search code, location, involved..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 rounded border p-2"
                    />
                    <button
                        type="submit"
                        className="rounded bg-blue-500 p-2 text-white"
                    >
                        Filter
                    </button>
                </form>

                {/* Table */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3">Code</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3">Damage</th>
                                    <th className="px-4 py-3">Fatality</th>
                                    <th className="px-4 py-3">Injured</th>
                                    <th className="px-4 py-3">CCTV</th>
                                    <th className="px-4 py-3">Involved</th>
                                    <th className="px-4 py-3">Operator</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {accidents.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="py-6 text-center text-gray-500"
                                        >
                                            No records found
                                        </td>
                                    </tr>
                                ) : (
                                    accidents.data.map((accident) => (
                                        <tr
                                            key={accident.id}
                                            className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <td className="px-4 py-3">
                                                {accident.code}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatDate(accident.date_time)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {accident.location}
                                            </td>
                                            <td className="px-4 py-3">
                                                {accident.damage}
                                            </td>
                                            <td className="px-4 py-3">
                                                {accident.fatality}
                                            </td>
                                            <td className="px-4 py-3">
                                                {accident.injured}
                                            </td>
                                            <td className="px-4 py-3">
                                                {accident.cctv}
                                            </td>
                                            <td className="px-4 py-3">
                                                {accident.involved}
                                            </td>
                                            <td className="px-4 py-3">
                                                {accident.operator_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() =>
                                                        openViewModal(accident)
                                                    }
                                                    className="rounded bg-blue-500 px-3 py-1 text-white"
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
                )}

                {/* Modal */}
                {isModalOpen && selectedAccident && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                            className="bg-opacity-50 absolute inset-0 bg-black backdrop-blur-sm"
                            onClick={closeViewModal}
                        />
                        <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Accident Details
                            </h2>
                            <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                <p>
                                    <strong>Code:</strong>{' '}
                                    {selectedAccident.code}
                                </p>
                                <p>
                                    <strong>Date:</strong>{' '}
                                    {formatDate(selectedAccident.date_time)}
                                </p>
                                <p>
                                    <strong>Location:</strong>{' '}
                                    {selectedAccident.location}
                                </p>
                                <p>
                                    <strong>Damage:</strong>{' '}
                                    {selectedAccident.damage}
                                </p>
                                <p>
                                    <strong>Fatality:</strong>{' '}
                                    {selectedAccident.fatality}
                                </p>
                                <p>
                                    <strong>Injured:</strong>{' '}
                                    {selectedAccident.injured}
                                </p>
                                <p>
                                    <strong>CCTV:</strong>{' '}
                                    {selectedAccident.cctv}
                                </p>
                                <p>
                                    <strong>Involved:</strong>{' '}
                                    {selectedAccident.involved}
                                </p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeViewModal}
                                    className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-4 flex justify-between">
                    {accidents.current_page > 1 && (
                        <button
                            onClick={() =>
                                fetchAccidents(accidents.current_page - 1)
                            }
                            className="rounded bg-accent px-3 py-1"
                        >
                            Previous
                        </button>
                    )}
                    {accidents.current_page < accidents.last_page && (
                        <button
                            onClick={() =>
                                fetchAccidents(accidents.current_page + 1)
                            }
                            className="rounded bg-accent px-3 py-1"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
