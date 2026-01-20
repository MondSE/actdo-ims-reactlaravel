import axios from 'axios';
import { Bell } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Notification {
    id: number;
    title: string;
    message?: string;
    status: number;
    created_at?: string;
}

export default function NotificationBell() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);

    // ✅ stable ref to avoid calling setState in effect body
    const initializedRef = useRef(false);

    const fetchNotifications = useCallback(async () => {
        try {
            const resCount = await axios.get('/notifications/unread-count');
            setCount(resCount.data.count ?? 0);

            const resList = await axios.get('/notifications/list');
            setList(resList.data ?? []);
        } catch (err) {
            console.error('❌ Notification fetch error:', err);
        }
    }, []);

    const markAsRead = async (id: number) => {
        try {
            await axios.post(`/notifications/read/${id}`);
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('/notifications/mark-all-read');
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ ESLint-safe effect
    useEffect(() => {
        const interval = setInterval(() => {
            fetchNotifications();
        }, 30000);

        // ✅ initial fetch happens via interval callback once
        if (!initializedRef.current) {
            initializedRef.current = true;
            fetchNotifications();
        }

        return () => clearInterval(interval);
    }, [fetchNotifications]);

    return (
        <div className="relative ml-auto">
            <button
                onClick={() => setOpen((o) => !o)}
                className="relative p-2 text-gray-700 dark:text-gray-200"
            >
                <Bell className="h-5 w-5" />
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1 text-xs text-white">
                        {count}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg dark:bg-black">
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
                                <div className="flex justify-between">
                                    <span>{n.title}</span>
                                    {n.created_at && (
                                        <span className="text-xs text-gray-400">
                                            {new Date(
                                                n.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>

                                {n.message && (
                                    <div className="text-xs">{n.message}</div>
                                )}

                                {n.status === 1 && (
                                    <button
                                        onClick={() => markAsRead(n.id)}
                                        className="mt-1 text-xs text-blue-500"
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
