// resources/js/components/RevenueChart.tsx
import axios from 'axios';
import {
    CategoryScale,
    ChartData,
    ChartDataset,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

// TypeScript interfaces
interface RevenueDataset extends ChartDataset<'line', number[]> {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
}

interface RevenueChartData extends ChartData<'line', number[], string> {
    labels: string[];
    datasets: RevenueDataset[];
}

interface RevenueItem {
    year: number;
    total: number;
}

export default function RevenueChart() {
    const [chartData, setChartData] = useState<RevenueChartData | null>(null);
    const [loading, setLoading] = useState(true);

    // Detect dark mode
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains('dark'),
    );

    useEffect(() => {
        // Observe class changes for dark mode toggle
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        fetchRevenue();

        return () => observer.disconnect();
    }, []);

    // Fetch revenue from backend
    const fetchRevenue = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/dashboard/revenue-per-year'); // must match your Laravel route
            const data: RevenueItem[] = res.data;

            const labels = data.map((d) => d.year.toString());
            const totals = data.map((d) => d.total);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Revenue Collected Per Year',
                        data: totals,
                        fill: true,
                        borderWidth: 3,
                        tension: 0.4,
                        borderColor: isDarkMode ? '#4F46E5' : '#3B82F6',
                        backgroundColor: isDarkMode
                            ? 'rgba(79,70,229,0.2)'
                            : 'rgba(59,130,246,0.2)',
                    },
                ],
            });
        } catch (err) {
            console.error('Failed to fetch revenue:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !chartData) return <p>Loading chart...</p>;

    return (
        <div className="w-full rounded-xl bg-white p-5 shadow-md dark:bg-neutral-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                Yearly Revenue
            </h2>
            <Line
                data={{
                    ...chartData,
                    datasets: chartData.datasets.map((ds) => ({
                        ...ds,
                        borderColor: isDarkMode ? '#4F46E5' : '#3B82F6',
                        backgroundColor: isDarkMode
                            ? 'rgba(79,70,229,0.2)'
                            : 'rgba(59,130,246,0.2)',
                    })),
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: isDarkMode ? '#E5E7EB' : '#374151',
                            },
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        },
                    },
                    interaction: {
                        mode: 'nearest',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: isDarkMode ? '#E5E7EB' : '#374151',
                            },
                            grid: {
                                color: isDarkMode
                                    ? 'rgba(229,231,235,0.2)'
                                    : 'rgba(156,163,175,0.2)',
                            },
                        },
                        y: {
                            ticks: {
                                color: isDarkMode ? '#E5E7EB' : '#374151',
                            },
                            grid: {
                                color: isDarkMode
                                    ? 'rgba(229,231,235,0.2)'
                                    : 'rgba(156,163,175,0.2)',
                            },
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
}
