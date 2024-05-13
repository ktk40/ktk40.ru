<?php

namespace App\Models;

use App\Models\Concerns\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class MenuTranslation extends Model
{
    use UsesUuid;

    public $timestamps = false;

    protected $table = 'menus_translations';
}
