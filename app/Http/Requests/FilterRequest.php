<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
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
            'search' => ['nullable', 'string'],
            'min_price' => ['nullable', 'numeric'],
            'max_price' => ['nullable', 'numeric'],
            'currency' => ['nullable', 'string'],
            'sale_type' => ['nullable', 'string'],
            'types' => ['nullable', 'array'],
            'elevator' => ['nullable', 'in:true,false,1,0'],
            'mortgage' => ['nullable', 'in:true,false,1,0'],
            'rooms_min' => ['nullable', 'numeric'],
            'rooms_max' => ['nullable', 'numeric'],
            'bathrooms_min' => ['nullable', 'numeric'],
            'bathrooms_max' => ['nullable', 'numeric'],
            'surface_min' => ['nullable', 'numeric'],
            'surface_max' => ['nullable', 'numeric'],
            'balconies_min' => ['nullable', 'numeric'],
            'balconies_max' => ['nullable', 'numeric'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }
}
