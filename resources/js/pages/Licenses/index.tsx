import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { TicketPlus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

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
    office: string;
    officer_name: string;
    transaction: String;
    date_transaction: string;
    official_receipt_no: string;
    amount_payment: number;
    type_vehicle: string;
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
    const [selectLicense, setSelectLicense] = useState<License | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    const openViewModal = (license: License) => {
        setSelectLicense(license);
        setIsModalOpen(true);
    };

    const closeViewModal = () => {
        setSelectLicense(null);
        setIsModalOpen(false);
    };

    const fetchLicenses = useCallback(
        async (page = 1) => {
            setLoading(true);
            try {
                const response = await axios.get('/api/licenses', {
                    params: { search, ticket_type: ticketType, page },
                });
                setLicenses({
                    data: response.data.data ?? [],
                    current_page: response.data.current_page ?? 1,
                    last_page: response.data.last_page ?? 1,
                });
            } catch (err) {
                console.error(err);
                setLicenses({ data: [], current_page: 1, last_page: 1 });
            } finally {
                setLoading(false);
            }
        },
        [search, ticketType],
    );

    useEffect(() => {
        const fetchData = async () => {
            await fetchLicenses();
        };
        fetchData();
    }, [search, ticketType]);

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
                    <Input
                        type="text"
                        placeholder="Search name, plate, violation..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 rounded border p-2"
                    />
                    <Select
                        value={ticketType}
                        onValueChange={(value) =>
                            setTicketType(
                                value.toLowerCase() as
                                    | 'towing'
                                    | 'ticket'
                                    | 'impounded'
                                    | '',
                            )
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Ticket" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value=" ">All Types</SelectItem>
                                <SelectItem value="towing">Towing</SelectItem>
                                <SelectItem value="ticket">Ticket</SelectItem>
                                <SelectItem value="impounded">
                                    Impounded
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button>
                        <TicketPlus />
                        Add Ticket
                    </Button>
                </form>

                {/* Table */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="w-full overflow-x-auto rounded-xl border shadow-sm">
                            <Table>
                                <TableCaption>
                                    List of License Records
                                </TableCaption>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ticket No</TableHead>
                                        <TableHead>Ticket Type</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>License No</TableHead>
                                        <TableHead>Plate</TableHead>
                                        <TableHead>Violation</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Office</TableHead>
                                        <TableHead>Officer</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {licenses.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={11}
                                                className="py-6 text-center text-gray-500"
                                            >
                                                No records found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        licenses.data.map((license) => (
                                            <TableRow key={license.id}>
                                                <TableCell className="font-medium">
                                                    {license.ticket_no}
                                                </TableCell>

                                                <TableCell>
                                                    <span
                                                        className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                                                            license.ticket_types ===
                                                            'towing'
                                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                                                : license.ticket_types ===
                                                                    'ticket'
                                                                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                                  : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                                        }`}
                                                    >
                                                        {license.ticket_types}
                                                    </span>
                                                </TableCell>

                                                <TableCell className="font-medium">
                                                    {license.full_name}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {license.driver_license_no}
                                                </TableCell>
                                                <TableCell>
                                                    {license.plate_no}
                                                </TableCell>
                                                <TableCell>
                                                    {license.violation}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(
                                                        license.date_apprehend,
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {license.office}
                                                </TableCell>
                                                <TableCell>
                                                    {license.officer_name}
                                                </TableCell>

                                                <TableCell>
                                                    {license.transaction ===
                                                    'Pending' ? (
                                                        <span className="font-semibold text-yellow-600">
                                                            {
                                                                license.transaction
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span className="font-semibold text-green-600">
                                                            {
                                                                license.transaction
                                                            }
                                                        </span>
                                                    )}
                                                </TableCell>

                                                <TableCell className="flex gap-2">
                                                    {license.transaction ===
                                                        'Pending' && (
                                                        <button
                                                            onClick={() =>
                                                                (window.location.href = `/licenses/${license.id}/edit`)
                                                            }
                                                            className="rounded-lg bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                    {(license.transaction ===
                                                        'Paid' ||
                                                        license.transaction ===
                                                            'Surrender') && (
                                                        <button
                                                            onClick={() =>
                                                                openViewModal(
                                                                    license,
                                                                )
                                                            }
                                                            className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                                                        >
                                                            View
                                                        </button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* PopUp Modal */}
                        {isModalOpen && selectLicense && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                {/* Backdrop */}
                                <div
                                    className="bg-opacity-50 absolute inset-0 bg-black backdrop-blur-sm"
                                    onClick={closeViewModal}
                                />

                                {/* Modal box */}
                                <div className="animate-fade-in relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                        License Details
                                    </h2>

                                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                        <p>
                                            <strong>Ticket No:</strong>{' '}
                                            {selectLicense.ticket_no}
                                        </p>
                                        <p>
                                            <strong>Ticket Type:</strong>{' '}
                                            {selectLicense.ticket_types}
                                        </p>
                                        <p>
                                            <strong>Name:</strong>{' '}
                                            {selectLicense.full_name}
                                        </p>
                                        <p>
                                            <strong>Driver License No:</strong>{' '}
                                            {selectLicense.driver_license_no}
                                        </p>
                                        <p>
                                            <strong>Plate No:</strong>{' '}
                                            {selectLicense.plate_no}
                                        </p>
                                        <p>
                                            <strong>Violation:</strong>{' '}
                                            {selectLicense.violation}
                                        </p>
                                        <p>
                                            <strong>Date Apprehened:</strong>{' '}
                                            {formatDate(
                                                selectLicense.date_apprehend,
                                            )}
                                        </p>
                                        <p>
                                            <strong>Vehicle:</strong>{' '}
                                            {selectLicense.type_vehicle}
                                        </p>
                                        <p>
                                            <strong>Amount:</strong>{' '}
                                            {selectLicense.amount_payment}
                                        </p>

                                        <p>
                                            <strong>Transaction:</strong>{' '}
                                            {selectLicense.transaction}
                                            {'/ '}
                                            {formatDate(
                                                selectLicense.date_transaction,
                                            )}
                                        </p>
                                        <p>
                                            <strong>Official Receipt:</strong>{' '}
                                            {selectLicense.official_receipt_no}
                                        </p>
                                        <p>
                                            <strong>
                                                Apprehender Officer:
                                            </strong>{' '}
                                            {selectLicense.officer_name}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={closeViewModal}
                                            className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

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
