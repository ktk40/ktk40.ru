<?php

namespace App\Models;

use App\Models\Concerns\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class DocTranslation extends Model
{
    use UsesUuid;

    public $timestamps = false;

    protected $table = 'docs_translations';
}
