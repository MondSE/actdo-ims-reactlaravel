import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Licenses Record',
        href: '/licenses',
    },
];

interface License {
    id: number;
    ticket_no: number;
    full_name: string;
    driver_license_no: string;
    plate_no: string;
    ticket_types: 'towing' | 'ticket' | 'impounded';
    violation: string;
    date_apprehend: string;
    officer_name: string;
}

interface LicenseResponse {
    data: License[];
    current_page: number;
    last_page: number;
}

export default function Licenses() {
    const [licenses, setLicenses] = useState<LicenseResponse>({
        data: [],
        current_page: 1,
        last_page: 1,
    });
    const [search, setSearch] = useState('');
    const [ticketType, setTicketType] = useState<
        'towing' | 'ticket' | 'impounded' | ''
    >('');
    const [loading, setLoading] = useState(false);

    const fetchLicenses = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get('/api/licenses', {
                params: { search, ticket_type: ticketType, page },
            });

            // Make sure we map the backend response to state
            // $licenses should have: data, current_page, last_page
            setLicenses({
                data: response.data.data ?? [], // fallback to empty array
                current_page: response.data.current_page ?? 1,
                last_page: response.data.last_page ?? 1,
            });

            console.log('Licenses fetched:', response.data); // debug
        } catch (err) {
            console.error('Error fetching licenses:', err);
            setLicenses({ data: [], current_page: 1, last_page: 1 });
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchLicenses();
    }, []);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchLicenses(1); // Reset to page 1 when filtering
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Head title="Licenses" />

                {/* Filter Form */}
                <form className="mb-4 flex gap-2" onSubmit={handleFilter}>
                    <input
                        type="text"
                        placeholder="Search name, plate, violation..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 rounded border p-2"
                    />
                    <select
                        value={ticketType}
                        onChange={(e) =>
                            setTicketType(
                                e.target.value as
                                    | 'towing'
                                    | 'ticket'
                                    | 'impounded'
                                    | '',
                            )
                        }
                        className="rounded border bg-accent p-2"
                    >
                        <option value="">All Types</option>
                        <option value="towing">Towing</option>
                        <option value="ticket">Ticket</option>
                        <option value="impounded">Impounded</option>
                    </select>
                    <button type="submit" className="rounded bg-blue-500 p-2">
                        Filter
                    </button>
                </form>

                {/* Table */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="w-full overflow-x-auto">
                            <table className="min-w-[800px] border-collapse border border-gray-200">
                                <thead>
                                    <tr className="">
                                        <th className="border p-2">
                                            Ticket No
                                        </th>
                                        <th className="border p-2">Name</th>
                                        <th className="border p-2">
                                            License No
                                        </th>
                                        <th className="border p-2">Plate</th>
                                        <th className="border p-2">
                                            Ticket Type
                                        </th>
                                        <th className="border p-2">
                                            Violation
                                        </th>
                                        <th className="border p-2">
                                            Date Apprehended
                                        </th>
                                        <th className="border p-2">
                                            Officer in charge
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {licenses.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="p-4 text-center"
                                            >
                                                No records found
                                            </td>
                                        </tr>
                                    ) : (
                                        licenses.data.map((license) => (
                                            <tr key={license.id}>
                                                <td className="border p-2">
                                                    {license.ticket_no}
                                                </td>
                                                <td className="border p-2">
                                                    {license.full_name}
                                                </td>
                                                <td className="border p-2">
                                                    {license.driver_license_no}
                                                </td>
                                                <td className="border p-2">
                                                    {license.plate_no}
                                                </td>
                                                <td className="border p-2">
                                                    {license.ticket_types}
                                                </td>
                                                <td className="border p-2">
                                                    {license.violation}
                                                </td>
                                                <td className="border p-2">
                                                    {license.date_apprehend}
                                                </td>
                                                <td className="border p-2">
                                                    {license.officer_name}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex justify-between">
                            {licenses.current_page > 1 && (
                                <button
                                    onClick={() =>
                                        fetchLicenses(licenses.current_page - 1)
                                    }
                                    className="rounded bg-accent px-3 py-1"
                                >
                                    Previous
                                </button>
                            )}
                            {licenses.current_page < licenses.last_page && (
                                <button
                                    onClick={() =>
                                        fetchLicenses(licenses.current_page + 1)
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
