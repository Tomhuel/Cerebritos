<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'achievement_id',
        'points',
        'expire_at'
    ];

    public function achievement()
    {
        return $this->belongsTo(Achievement::class, 'achievement_id');
    }
}
