import axios from 'axios';
import { Bell } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface Notification {
    id: number;
    title: string;
    message: string;
    status: number;
    created_at: string;
}

export default function NotificationBell() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);

    const fetchNotifications = useCallback(async () => {
        try {
            const resCount = await axios.get('/notifications/unread-count');
            setCount(resCount.data.count ?? 0);

            const resList = await axios.get('/notifications/list');
            setList(resList.data ?? []);
        } catch (err) {
            console.error('❌ Error fetching notifications:', err);
        }
    }, []);

    const markAsRead = useCallback(
        async (id: number) => {
            try {
                await axios.post(`/notifications/read/${id}`);
                fetchNotifications();
            } catch (err) {
                console.error(err);
            }
        },
        [fetchNotifications],
    );

    const markAllAsRead = useCallback(async () => {
        try {
            await axios.post('/notifications/mark-all-read');
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    }, [fetchNotifications]);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    return (
        <div className="relative ml-auto">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative p-2 text-gray-700 dark:text-gray-200"
            >
                <Bell />
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1 text-xs text-white">
                        {count}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute left-0 z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg dark:bg-black">
                    <div className="flex justify-between border-b p-2">
                        <span className="font-semibold">Notifications</span>
                        <button
                            onClick={markAllAsRead}
                            className="text-sm text-blue-500"
                        >
                            Mark all as read
                        </button>
                    </div>

                    <ul className="max-h-64 overflow-y-auto">
                        {list.length === 0 && (
                            <li className="p-2 text-gray-500">
                                No notifications
                            </li>
                        )}

                        {list.map((n) => (
                            <li
                                key={n.id}
                                className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                                    n.status === 1
                                        ? 'font-semibold'
                                        : 'text-gray-500'
                                }`}
                            >
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="font-medium">{n.title}</div>
                                    <div>
                                        <span className="text-right text-xs">
                                            {' '}
                                            {new Date(
                                                n.created_at,
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {n.message && (
                                    <div className="text-xs">{n.message}</div>
                                )}

                                {n.status === 1 && (
                                    <button
                                        onClick={() => markAsRead(n.id)}
                                        className="text-xs text-blue-500"
                                    >
                                        Mark as read
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
