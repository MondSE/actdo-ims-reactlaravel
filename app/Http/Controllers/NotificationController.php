<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // Fetch unread count
    public function unreadCount()
    {
        $count = Notification::where('user_id', Auth::id())
                             ->where('status', 1)
                             ->count();

        return response()->json(['count' => $count]);
    }

    // Fetch latest notifications
    public function getNotifications()
    {
        $notifications = Notification::where('user_id', Auth::id())
                                     ->orderBy('created_at', 'desc')
                                     ->take(10)
                                     ->get();

        return response()->json($notifications);
    }

    // Mark a notification as read
    public function markAsRead($id)
    {
        $notif = Notification::where('id', $id)
                             ->where('user_id', Auth::id())
                             ->first();

        if ($notif) {
            $notif->update(['status' => 0]);
        }

        return response()->json(['success' => true]);
    }

    // Optional: mark all as read
    public function markAllAsRead()
    {
        Notification::where('user_id', Auth::id())
                    ->where('status', 1)
                    ->update(['status' => 0]);

        return response()->json(['success' => true]);
    }
}
