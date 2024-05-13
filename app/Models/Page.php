<?php

namespace App\Models;

use App\Models\Concerns\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use SoftDeletes, HasFactory, UsesUuid, Translatable;

    /**
     * Array with the fields translated in the Translation table.
     *
     * @var array
     */
    public array $translatedAttributes = ['title', 'text', 'description'];
}
