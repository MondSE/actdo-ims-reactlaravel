import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface LicenseStats {
    towing: number;
    ticket: number;
    impounded: number;
}

interface DashboardStats {
    accidents: number;
    employees: number;
    complaints: number;
    licenses: LicenseStats;
}

export default function Dashboard() {
    const page = usePage();

    // Use optional chaining and fallback
    const stats: DashboardStats = (page.props as any).stats ?? {
        accidents: 0,
        employees: 0,
        complaints: 0,
        licenses: { towing: 0, ticket: 0, impounded: 0 },
    };

    console.log('Stats:', stats);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <DashboardCard label="Accidents" value={stats.accidents} />
                    <DashboardCard label="Employees" value={stats.employees} />
                    <DashboardCard
                        label="Complaints"
                        value={stats.complaints}
                    />
                    <DashboardCard
                        label="Towing"
                        value={stats.licenses.towing}
                    />
                    <DashboardCard
                        label="Ticket"
                        value={stats.licenses.ticket}
                    />
                    <DashboardCard
                        label="Impounded"
                        value={stats.licenses.impounded}
                    />
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}

function DashboardCard({
    label,
    value,
}: {
    label: string;
    value: number | string;
}) {
    return (
        <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 p-4 text-center dark:border-sidebar-border">
            <h2 className="text-lg font-semibold">{label}</h2>
            <p className="mt-2 text-4xl font-bold">{value}</p>
            <PlaceholderPattern className="pointer-events-none absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
    );
}
