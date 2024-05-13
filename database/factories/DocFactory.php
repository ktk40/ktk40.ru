<?php

namespace Database\Factories;

use App\Models\Doc;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class DocFactory extends Factory
{
    protected $model = Doc::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
