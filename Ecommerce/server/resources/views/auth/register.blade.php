
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                    
                        <label for="pseudo">Peudo:</label>
                        <input type="text" id="pseudo" name="pseudo" value="{{ old('pseudo') }}" required autofocus>
                        @error('pseudo')
                            <span>{{ $message }}</span>
                        @enderror
                    
                        <label for="email">Adresse email:</label>
                        <input type="email" id="email" name="email" value="{{ old('email') }}" required>
                        @error('email')
                            <span>{{ $message }}</span>
                        @enderror
                    
                        <label for="password">Mot de passe:</label>
                        <input type="password" id="password" name="password" required>
                        @error('password')
                            <span>{{ $message }}</span>
                        @enderror
                    
                        <label for="password_confirmation">Confirmer le mot de passe:</label>
                        <input type="password" id="password_confirmation" name="password_confirmation" required>
                    
                        <button type="submit">S'inscrire</button>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</div>

