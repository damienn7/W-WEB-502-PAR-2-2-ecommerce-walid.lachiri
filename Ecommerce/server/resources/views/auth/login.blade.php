
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                    
                        <label for="email">Adresse email:</label>
                        <input type="email" id="email" name="email" value="{{ old('email') }}" required autofocus>
                        @error('email')
                            <span>{{ $message }}</span>
                        @enderror
                    
                        <label for="password">Mot de passe:</label>
                        <input type="password" id="password" name="password" required>
                        @error('password')
                            <span>{{ $message }}</span>
                        @enderror
                    
                        <button type="submit">Se connecter</button>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</div>

