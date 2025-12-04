<?php

namespace App\Notifications;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class CustomVerifyEmail extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public User $user)
    {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $hash = hash_hmac('sha256', $notifiable->id, config('app.key'));
        $url = URL::temporarySignedRoute(
            'custom.verify',
            Carbon::now()->addMinutes(60),
            [
                'id' => $notifiable->id,
                'hash' => $hash
            ]
        );
        return (new MailMessage)
            ->subject("Verifiko Email-in")
            ->greeting("Mirsevini ne platformen tone!")
            ->line("Klikoni butonin me poshte per te verifikuar adresen tuaj te email-it.")
            ->action("Verifiko Email-in", $url)
            ->line("Nese nuk keni krijuar nje llogari, ju lutem injoroni kete email.");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
