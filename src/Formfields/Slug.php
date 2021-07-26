<?php

namespace Voyager\Admin\Formfields;

use Voyager\Admin\Classes\Formfield;

class Slug extends Formfield
{
    public function type(): string
    {
        return 'slug';
    }

    public function name(): string
    {
        return __('voyager::formfields.slug.name');
    }
}
