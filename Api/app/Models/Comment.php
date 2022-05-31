<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Comment extends Model
{
    protected $with =['user'];
    use HasFactory;
        protected $fillable = [
        'body',
        'post_id',
        'user_id'
    ];
     public function user()
    {
        return $this->belongsTo(User::class);
    }

     protected $guarded = [];
}
