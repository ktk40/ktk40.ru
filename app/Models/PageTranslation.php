<?php

namespace App\Models;

use App\Models\Concerns\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class PageTranslation extends Model
{
    use UsesUuid;

    protected $table = 'pages_translations';

    public $timestamps = false;
}
