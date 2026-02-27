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
            'search' => ['nullable', 'string', 'max:255'],
            'min_price' => ['nullable', 'numeric', 'min:0', 'max:999999999'],
            'max_price' => ['nullable', 'numeric', 'min:0', 'max:999999999'],
            'currency' => ['nullable', 'string', 'max:10'],
            'sale_type' => ['nullable', 'string', 'max:50'],
            'types' => ['nullable', 'array', 'max:20'],
            'elevator' => ['nullable', 'in:true,false,1,0'],
            'mortgage' => ['nullable', 'in:true,false,1,0'],
            'rooms_min' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'rooms_max' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'bathrooms_min' => ['nullable', 'numeric', 'min:0', 'max:50'],
            'bathrooms_max' => ['nullable', 'numeric', 'min:0', 'max:50'],
            'surface_min' => ['nullable', 'numeric', 'min:0', 'max:999999'],
            'surface_max' => ['nullable', 'numeric', 'min:0', 'max:999999'],
            'balconies_min' => ['nullable', 'numeric', 'min:0', 'max:50'],
            'balconies_max' => ['nullable', 'numeric', 'min:0', 'max:50'],
            'user_id' => ['nullable', 'exists:users,id'],
            'saved' => ['nullable', 'in:true,false,1,0'],
        ];
    }
}
