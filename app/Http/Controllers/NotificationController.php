<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
  public function getNotifications()
{
    $notifications = Notification::where('user_id', auth()->id())
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($notifications);
}

public function unreadCount()
{
    $count = Notification::where('user_id', auth()->id())
        ->where('status', 1)
        ->count();

    return response()->json(['count' => $count]);
}

public function markAsRead($id)
{
    $notification = Notification::where('user_id', auth()->id())
        ->where('id', $id)
        ->firstOrFail();

    $notification->update(['status' => 0]);

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
