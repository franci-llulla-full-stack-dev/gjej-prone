<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordAl extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public string $token
    ) {}

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
        $url = url(route('password.reset', [
                'token' => $this->token,
                'email' => $notifiable->email,
            ], false));
        return (new MailMessage)
            ->subject('Rivendosja e fjalekalimit')
            ->greeting('Pershendetje!')
            ->line('Po e merr kete email sepse kemi marre nje kerkese per rivendosjen e fjalekalimit.')
            ->action('Rivendos fjalekalimin', $url)
            ->line('Ky link skadon pas 60 minutash.')
            ->line('Nese nuk e ke kerkuar ti kete veprim, nuk nevojitet asnje veprim tjeter.')
            ->salutation('Faleminderit !');
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
