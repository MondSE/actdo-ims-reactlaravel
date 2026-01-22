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
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { PhilippinePeso, TicketPlus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ticket Record',
        href: '/licenses',
    },
];

interface License {
    id: number;
    ticket_no: number;
    full_name: string;
    driver_license_no: string;
    plate_no: string;
    ticket_types: 'Towing Ticket' | 'Traffic Ticket' | 'Impounding Ticket';
    violation: string;
    date_apprehend: string;
    office: string;
    officer_name: string;
    transaction: string;
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
        'Towing Ticket' | 'Traffic Ticket' | 'Impounding Ticket' | ''
    >('');
    const [loading, setLoading] = useState(false);

    const [selectedLicense, setSelectedLicense] = useState<License | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ Local-safe date format
    const formatDate = (date: string) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    };

    const openViewModal = (license: License) => {
        setSelectedLicense(license);
        setIsModalOpen(true);
    };

    const closeViewModal = () => {
        setSelectedLicense(null);
        setIsModalOpen(false);
    };

    // ✅ Proper useCallback
    const fetchLicenses = useCallback(
        async (page = 1) => {
            setLoading(true);

            try {
                const response = await axios.get('/api/licenses', {
                    params: {
                        search,
                        ticket_type: ticketType || undefined,
                        page,
                    },
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

    // ✅ ESLint-safe effect
    useEffect(() => {
        fetchLicenses();
    }, [fetchLicenses]);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchLicenses(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Head title="Tickets" />

                {/* FILTER */}
                <form
                    className="mb-4 flex flex-wrap gap-2"
                    onSubmit={handleFilter}
                >
                    <Input
                        type="text"
                        placeholder="Search name, plate, violation..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1"
                    />

                    <Select
                        value={ticketType}
                        onValueChange={(value) =>
                            setTicketType(
                                value as
                                    | 'Towing Ticket'
                                    | 'Traffic Ticket'
                                    | 'Impounding Ticket'
                                    | '',
                            )
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value=" ">All Types</SelectItem>
                                <SelectItem value="Towing Ticket">
                                    Towing Ticket
                                </SelectItem>
                                <SelectItem value="Traffic Ticket">
                                    Traffic Ticket
                                </SelectItem>
                                <SelectItem value="Impounding Ticket">
                                    Impounding Ticket
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Link href="/licenses/payment">
                        <Button type="button">
                            <PhilippinePeso />
                            Payment
                        </Button>
                    </Link>

                    <Link href="/licenses/create">
                        <Button type="button">
                            <TicketPlus className="mr-2 h-4 w-4" />
                            Add Ticket
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
                                <TableCaption>
                                    List of License Records
                                </TableCaption>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ticket No</TableHead>
                                        <TableHead>Type</TableHead>
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
                                                            'Towing Ticket'
                                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                                                : license.ticket_types ===
                                                                    'Traffic Ticket'
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

                                                <TableCell>
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
                                                    <span
                                                        className={`font-semibold ${
                                                            license.transaction ===
                                                            'Pending'
                                                                ? 'text-yellow-600'
                                                                : 'text-green-600'
                                                        }`}
                                                    >
                                                        {license.transaction}
                                                    </span>
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

                        {/* MODAL */}
                        {isModalOpen && selectedLicense && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                                    onClick={closeViewModal}
                                />

                                <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
                                    <h2 className="mb-4 text-xl font-semibold">
                                        License Details
                                    </h2>

                                    <div className="space-y-2">
                                        <p>
                                            <strong>Ticket No:</strong>{' '}
                                            {selectedLicense.ticket_no}
                                        </p>
                                        <p>
                                            <strong>Type:</strong>{' '}
                                            {selectedLicense.ticket_types}
                                        </p>
                                        <p>
                                            <strong>Name:</strong>{' '}
                                            {selectedLicense.full_name}
                                        </p>
                                        <p>
                                            <strong>Violation:</strong>{' '}
                                            {selectedLicense.violation}
                                        </p>
                                        <p>
                                            <strong>Date:</strong>{' '}
                                            {formatDate(
                                                selectedLicense.date_apprehend,
                                            )}
                                        </p>
                                        <p>
                                            <strong>Vehicle:</strong>{' '}
                                            {selectedLicense.type_vehicle}
                                        </p>
                                        <p>
                                            <strong>Amount:</strong>{' '}
                                            {selectedLicense.amount_payment}
                                        </p>
                                        <p>
                                            <strong>Transaction:</strong>{' '}
                                            {selectedLicense.transaction} /{' '}
                                            {formatDate(
                                                selectedLicense.date_transaction,
                                            )}
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

                        {/* PAGINATION */}
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
