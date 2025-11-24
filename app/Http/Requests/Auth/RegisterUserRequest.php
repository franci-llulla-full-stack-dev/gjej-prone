<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'surname' => ['required', 'string'],
            'phone_number' => ['required', 'string'],
            'birth_date' => ['required', 'date'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'company_name' => ['nullable', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'user_type' => ['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Emri është i nevojshëm',
            'name.string' => 'Emri duhet të jetë tekst',

            'surname.required' => 'Mbiemri është i nevojshëm',
            'surname.string' => 'Mbiemri duhet të jetë tekst',

            'phone_number.required' => 'Numri i telefonit është i nevojshëm',
            'phone_number.string' => 'Numri i telefonit duhet të jetë tekst',

            'birth_date.required' => 'Datëlindja është e nevojshme',
            'birth_date.date' => 'Datëlindja duhet të jetë një datë e vlefshme',

            'email.required' => 'Email është i nevojshëm',
            'email.string' => 'Email duhet të jetë tekst',
            'email.email' => 'Email duhet të ketë një format të vlefshëm',
            'email.unique' => 'Ky email është përdorur tashmë',

            'company_name.string' => 'Emri i kompanisë duhet të jetë tekst',

            'password.required' => 'Fjalëkalimi është i nevojshëm',
            'password.string' => 'Fjalëkalimi duhet të jetë tekst',
            'password.min' => 'Fjalëkalimi duhet të ketë të paktën 8 karaktere',
            'password.confirmed' => 'Konfirmimi i fjalëkalimit nuk përputhet',

            'user_type.required' => 'Ju duhet të zgjidhni një lloj përdoruesi',
        ];
    }
}
