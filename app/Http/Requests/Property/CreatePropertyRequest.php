<?php

namespace App\Http\Requests\Property;

use Illuminate\Foundation\Http\FormRequest;

class CreatePropertyRequest extends FormRequest
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
            'type_of_sale' => ['required', 'string'],
            'property_type' => ['required', 'string'],
            'property_category' => ['required', 'string'],
            'city' => ['required', 'string'],
            'street' => ['required', 'string'],
            'surface' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'currency' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'total_rooms' => ['nullable', 'numeric'],
            'total_bathrooms' => ['nullable', 'numeric'],
            'total_balconies' => ['nullable', 'numeric'],
            'floor_number' => ['nullable', 'numeric'],
            'total_floors' => ['nullable', 'numeric'],
            'year_built' => ['nullable', 'numeric'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'images' => ['required', 'array', 'min:5'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ];
    }
}
