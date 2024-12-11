<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
</head>
<body>
    <h1>Welcome to Home Page</h1>
    <p>This is your home page after login.</p>

    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>

    <button onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
        Cerrar Sesión
    </button>
</body>
</html>
