<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'points'
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function codes() {
        return $this->hasMany(Code::class);
    }
}
