<?php

namespace Voyager\Admin\Plugins;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\View\View;
use Voyager\Admin\Contracts\Plugins\AuthenticationPlugin as AuthContract;
use Voyager\Admin\Facades\Voyager as VoyagerFacade;

class AuthenticationPlugin implements AuthContract
{
    private bool $registered = false;

    public function user(): ?object
    {
        return Auth::user();
    }

    public function name(): ?string
    {
        return Auth::user()->name; // @phpstan-ignore-line
    }

    public function avatar(): ?string
    {
        return VoyagerFacade::assetUrl('images/default-avatar.png');
    }

    public function guard(): string
    {
        return 'web';
    }

    public function authenticate(Request $request): ?array
    {
        if (!$request->get('email', null) || !$request->get('password', null)) {
            return [ __('voyager::auth.error_field_empty') ];
        }

        // TODO: Throttle attempts
        if (Auth::attempt($request->only('email', 'password'), $request->has('remember'))) {
            return null;
        }

        return [ __('voyager::auth.login_failed') ];
    }

    public function logout(): \Illuminate\Http\RedirectResponse
    {
        Auth::logout();

        return redirect()->route('voyager.login');
    }

    public function redirectTo(): string
    {
        return route('voyager.dashboard');
    }

    public function forgotPassword(Request $request): \Illuminate\Http\RedirectResponse
    {
        // TODO: Throttle attempts
        $email = $request->get('email');
        // TODO: Validate Email, check if it exists, send mail

        return redirect()->back()->with([
            'success' => __('voyager::auth.forgot_password_conf'),
        ]);
    }

    public function handleRequest(Request $request, Closure $next): mixed
    {
        if (!$this->registered) {
            auth()->setDefaultDriver($this->guard());
            $this->registered = true;
            Event::dispatch('voyager.auth.registered', $this);
        }

        if ($this->user() && !Auth::guest()) {
            return $next($request);
        }

        return redirect()->guest(route('voyager.login'));
    }

    public function loginView(): ?View
    {
        return null; // Return null will show the default form
    }

    public function forgotPasswordView(): ?View
    {
        return null;
    }
}
