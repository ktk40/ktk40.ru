<?php

namespace App\Models;

use App\Models\Concerns\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory, UsesUuid, Translatable;

    /**
     * Array with the fields translated in the Translation table.
     *
     * @var array
     */
    public array $translatedAttributes = ['title'];
}
