<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'age',
        'role_id',
        'google_id',
        'uuid',
        'username',
        'image'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function clubs()
    {
        return $this->belongsToMany(Club::class);
    }

    public function listas()
    {
        return $this->belongsToMany(Lista::class);
    }

    public function achievements()
    {
        return $this->belongsToMany(Achievement::class);
    }

    public function kids()
    {
        return $this->belongsToMany(User::class, 'father_kid', 'father_id', 'kid_id');
    }

    public function fathers()
    {
        return $this->belongsToMany(User::class, 'father_kid', 'kid_id', 'father_id');
    }
}
