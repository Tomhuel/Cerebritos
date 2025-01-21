<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        "message",
        "logType"
    ];

    public static function new(string $message, $logType) {
        Log::create([
            'message' => $message,
            'logType' => $logType
        ]);
    }
}
