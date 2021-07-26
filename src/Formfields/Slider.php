<?php

namespace Voyager\Admin\Formfields;

use Voyager\Admin\Classes\Formfield;
use Voyager\Admin\Facades\Voyager as VoyagerFacade;

class Slider extends Formfield
{
    public function type(): string
    {
        return 'slider';
    }

    public function name(): string
    {
        return __('voyager::formfields.slider.name');
    }
}
