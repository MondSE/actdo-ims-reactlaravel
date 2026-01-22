import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Ticket', href: '/licenses' },
    { title: 'Register', href: '/licenses/create' },
];

interface Employee {
    id: number;
    name: string;
}

export default function LicenseCreate() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [form, setForm] = useState({
        ticket_type: '',
        ticket_no: '',
        full_name: ['', '', ''],
        driver_license_no: '',
        plate_no: '',
        province_city: '',
        brand_model: '',
        color_brand_model: '',
        vehicle_type: '',
        public_transport_state: 'N/A',
        officer: '',
        office: '',
        location_violation: '',
        date_apprehend: '',
        remarks: '',
        violation: [] as string[],
    });

    const [submitting, setSubmitting] = useState(false);

    // Fetch active employees for officer select
    useEffect(() => {
        const fetchActiveOfficers = async () => {
            try {
                const res = await axios.get('/api/employees/active-officers');
                setEmployees(res.data.data ?? res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchActiveOfficers();
    }, []);

    const handleChange = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleFullNameChange = (index: number, value: string) => {
        const newFullName = [...form.full_name];
        newFullName[index] = value;
        setForm((prev) => ({ ...prev, full_name: newFullName }));
    };

    const handleViolationToggle = (value: string) => {
        setForm((prev) => {
            const exists = prev.violation.includes(value);
            return {
                ...prev,
                violation: exists
                    ? prev.violation.filter((v) => v !== value)
                    : [...prev.violation, value],
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !form.ticket_type ||
            !form.ticket_no ||
            !form.officer ||
            !form.office ||
            !form.date_apprehend ||
            form.violation.length === 0
        ) {
            alert('Please fill all required fields');
            return;
        }

        setSubmitting(true);
        setSuccessMessage(''); // clear previous message
        try {
            await axios.post('/licenses', form);

            // Set success message
            setSuccessMessage('License created successfully!');

            // Reset the form
            setForm({
                ticket_type: '',
                ticket_no: '',
                full_name: ['', '', ''],
                driver_license_no: '',
                plate_no: '',
                province_city: '',
                brand_model: '',
                color_brand_model: '',
                vehicle_type: '',
                public_transport_state: 'N/A',
                officer: '',
                office: '',
                location_violation: '',
                date_apprehend: '',
                remarks: '',
                violation: [],
            });
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error(err.response?.data);
            } else {
                console.error(err);
            }
            alert('Failed to create license.');
        } finally {
            setSubmitting(false);
        }
    };

    // Violations lists
    const movingViolations = [
        'Reckless Driving',
        'Over speeding',
        'Counter Flow',
        'Over charging',
        'Using Gadget while Driving',
        'Colorum',
        'Illegal Terminal',
        'Unregistered',
        'Expired Registration',
        'Driving Without License',
        'Invalid Drivers License',
        'No Color Band/Scheme',
        'No Panel Route/Body Number',
        'Refusal to Convey Passenger',
        'TruckBan',
        'Cutting Trip',
        'Smoking While Driving',
        'Overloading',
        'No Headlight, Parklight, Signal Light',
        'Improvised Plate w/ No authority from LTO',
        'Operating Out of Line',
        'Modified Muffler',
        'No Fare Matrix',
        'No Helmet',
        'No Seatbelt',
        'Wearing Slipper',
        'Sleeveless',
        'Disregarding traffic/Police Officer',
        'Arrogant',
        'No Side Mirror',
        'Outer Most Lane',
        'Student Permit',
        'Driving Motorcyle with Child Passenger',
    ];

    const nonMovingViolations = [
        'Obstruction',
        'Disregarding Traffic Sign/Light',
        'Loading/Unloading on Prohibited Zone',
        'Abandonment of Motor Vehicle',
        'Illegal Parking/Stalled Motor Vehicle',
        "No Mayor's Permit",
        'Liqour',
        'Illegal Drugs',
        'No Uniform',
        'Cover Face',
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register Ticket" />
            <div className="p-4">
                {successMessage && (
                    <div className="mb-4 rounded bg-green-100 p-2 text-green-700">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Ticket Info */}
                    <div className="flex flex-wrap gap-2">
                        <Select
                            value={form.ticket_type}
                            onValueChange={(v) =>
                                handleChange('ticket_type', v)
                            }
                        >
                            <SelectTrigger className="w-44">
                                <SelectValue placeholder="Ticket Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Traffic Ticket">
                                        Traffic Ticket
                                    </SelectItem>
                                    <SelectItem value="Impounding Ticket">
                                        Impounding Ticket
                                    </SelectItem>
                                    <SelectItem value="Towing Ticket">
                                        Towing Ticket
                                    </SelectItem>
                                    <SelectItem value="LTO Ticket">
                                        LTO Ticket
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input
                            type="Text"
                            placeholder="Ticket No"
                            value={form.ticket_no}
                            onChange={(e) =>
                                handleChange('ticket_no', e.target.value)
                            }
                            className="w-32"
                        />
                    </div>

                    {/* Full Name */}
                    <div className="flex grid grid-cols-3 flex-wrap gap-2">
                        <Input
                            placeholder="Last Name"
                            value={form.full_name[0]}
                            onChange={(e) =>
                                handleFullNameChange(0, e.target.value)
                            }
                        />
                        <Input
                            placeholder="First Name"
                            value={form.full_name[1]}
                            onChange={(e) =>
                                handleFullNameChange(1, e.target.value)
                            }
                        />
                        <Input
                            placeholder="Middle Name"
                            value={form.full_name[2]}
                            onChange={(e) =>
                                handleFullNameChange(2, e.target.value)
                            }
                        />
                    </div>

                    {/* ID / Vehicle */}
                    <div className="flex grid grid-cols-3 flex-wrap gap-2">
                        <Input
                            placeholder="Driver License No"
                            value={form.driver_license_no}
                            onChange={(e) =>
                                handleChange(
                                    'driver_license_no',
                                    e.target.value,
                                )
                            }
                        />
                        <Input
                            placeholder="Plate No"
                            value={form.plate_no}
                            onChange={(e) =>
                                handleChange('plate_no', e.target.value)
                            }
                        />
                        <Input
                            placeholder="Province/City"
                            value={form.province_city}
                            onChange={(e) =>
                                handleChange('province_city', e.target.value)
                            }
                        />
                    </div>

                    <div className="flex grid grid-cols-4 flex-wrap gap-2">
                        <Input
                            placeholder="Brand/Model"
                            value={form.brand_model}
                            onChange={(e) =>
                                handleChange('brand_model', e.target.value)
                            }
                        />
                        <Input
                            placeholder="Color Brand/Model"
                            value={form.color_brand_model}
                            onChange={(e) =>
                                handleChange(
                                    'color_brand_model',
                                    e.target.value,
                                )
                            }
                        />
                        <Select
                            value={form.vehicle_type}
                            onValueChange={(v) =>
                                handleChange('vehicle_type', v)
                            }
                        >
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="Vehicle Type" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                <SelectGroup>
                                    <SelectItem value="Private">
                                        Private
                                    </SelectItem>
                                    <SelectItem value="Single">
                                        Single
                                    </SelectItem>
                                    <SelectItem value="Tricycle">
                                        Tricycle
                                    </SelectItem>
                                    <SelectItem value="Truck">Truck</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={form.public_transport_state}
                            onValueChange={(v) =>
                                handleChange('public_transport_state', v)
                            }
                        >
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="Public Transport" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="N/A">N/A</SelectItem>
                                    <SelectItem value="City Limit">
                                        City Limit
                                    </SelectItem>
                                    <SelectItem value="Outside City Limit">
                                        Outside City Limit
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Officer / Office */}
                    <div className="flex grid grid-cols-4 flex-wrap gap-3">
                        <Select
                            value={form.officer}
                            onValueChange={(v) => handleChange('officer', v)}
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select Officer" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                <SelectGroup>
                                    {employees.map((emp) => (
                                        <SelectItem
                                            key={emp.id}
                                            value={emp.name}
                                        >
                                            {emp.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select
                            value={form.office}
                            onValueChange={(v) => handleChange('office', v)}
                        >
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="Select Office" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="ACTDO">ACTDO</SelectItem>
                                    <SelectItem value="PTRO">PTRO</SelectItem>
                                    <SelectItem value="ACTMEU">
                                        ACTMEU
                                    </SelectItem>
                                    <SelectItem value="BRGY">BRGY</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Input
                            type="text"
                            placeholder="Place of Violation"
                            value={form.location_violation}
                            onChange={(e) =>
                                handleChange(
                                    'location_violation',
                                    e.target.value,
                                )
                            }
                        />
                        <Input
                            type="date"
                            value={form.date_apprehend}
                            onChange={(e) =>
                                handleChange('date_apprehend', e.target.value)
                            }
                        />
                        <Input
                            placeholder="Remarks"
                            value={form.remarks}
                            onChange={(e) =>
                                handleChange('remarks', e.target.value)
                            }
                        />
                    </div>

                    {/* Violations Tabs */}
                    <Tabs defaultValue="Non-Moving Violations">
                        <TabsList>
                            <TabsTrigger value="Non-Moving Violations">
                                Non-Moving Violations
                            </TabsTrigger>
                            <TabsTrigger value="Moving Violations">
                                Moving Violations
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="Non-Moving Violations">
                            <FieldGroup>
                                <Field
                                    orientation={'horizontal'}
                                    className="flex grid flex-wrap md:grid-cols-2"
                                >
                                    {nonMovingViolations.map((v) => (
                                        <Label
                                            key={v}
                                            className="flex cursor-pointer items-center gap-1"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.violation.includes(
                                                    v,
                                                )}
                                                onChange={() =>
                                                    handleViolationToggle(v)
                                                }
                                            />
                                            {v}
                                        </Label>
                                    ))}
                                </Field>
                            </FieldGroup>
                        </TabsContent>
                        <TabsContent value="Moving Violations">
                            <FieldGroup className="">
                                <Field
                                    orientation={'horizontal'}
                                    className="flex grid grid-cols-2 flex-wrap"
                                >
                                    {movingViolations.map((v) => (
                                        <Label
                                            key={v}
                                            className="flex cursor-pointer items-center gap-1"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.violation.includes(
                                                    v,
                                                )}
                                                onChange={() =>
                                                    handleViolationToggle(v)
                                                }
                                            />
                                            {v}
                                        </Label>
                                    ))}
                                </Field>
                            </FieldGroup>
                        </TabsContent>
                    </Tabs>

                    <Button type="submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Create License'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
