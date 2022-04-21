<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Categorie;
use App\Models\Comment;
class Post extends Model
{
    use HasFactory;
    protected $with =['user'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
     public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    protected $guarded = [];
}

