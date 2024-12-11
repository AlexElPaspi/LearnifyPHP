<form method="POST" action="{{ route('register') }}">
    @csrf
    <input type="text" name="first_name" placeholder="First Name" required>
    <input type="text" name="last_name" placeholder="Last Name" required>
    <input type="date" name="birth_date" placeholder="Birth Date" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="password" name="password_confirmation" placeholder="Confirm Password" required>
    <input type="text" name="role" placeholder="Role" required>
    <button type="submit">Register</button>
</form>
