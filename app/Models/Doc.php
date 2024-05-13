<?php

namespace App\Models;

use App\Models\Concerns\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class Doc extends Model
{
    use SoftDeletes, HasFactory, Translatable, UsesUuid;
}
