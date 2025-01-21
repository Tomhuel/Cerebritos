<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lista extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'list_start',
        'list_end'
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }
}
