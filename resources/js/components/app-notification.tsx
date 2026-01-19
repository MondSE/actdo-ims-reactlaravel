import axios from 'axios';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Notification {
    id: number;
    title: string;
    message: string;
    status: number;
}

export default function NotificationBell() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const resCount = await axios.get('/notifications/unread-count');
            console.log('Unread Count:', resCount.data);
            setCount(resCount.data.count);

            const resList = await axios.get('/notifications/list');
            console.log('Notification List:', resList.data);
            setList(resList.data);
        } catch (err) {
            console.error('❌ Error fetching notifications:', err);
        }
    };

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
            await axios.post(`/notifications/mark-all-read`);
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="relative ml-auto">
            <button
                onClick={() => setOpen(!open)}
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
                                        : 'font-normal text-gray-500'
                                }`}
                            >
                                <div>{n.title}</div>
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
