<?php

namespace App\Http\Requests\Property;

use Illuminate\Foundation\Http\FormRequest;

class CreatePropertyRequestRequest extends FormRequest
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
            'surface_2' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'price_2' => ['required', 'numeric'],
            'currency' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'total_rooms' => ['nullable', 'numeric'],
            'total_rooms_2' => ['nullable', 'numeric'],
            'total_bathrooms' => ['nullable', 'numeric'],
            'total_bathrooms_2' => ['nullable', 'numeric'],
            'total_balconies' => ['nullable', 'numeric'],
            'total_balconies_2' => ['nullable', 'numeric'],
            'floor_number' => ['nullable', 'numeric'],
            'total_floors' => ['nullable', 'numeric'],
            'year_built' => ['nullable', 'numeric'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'zone_radious' => ['nullable', 'numeric'],
            'ashensor' => ['nullable', 'boolean'],
            'hipoteke' => ['nullable', 'boolean'],
            'interior_design' => ['nullable', 'boolean'],
            'architect' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'type_of_sale.required' => 'Lloji i shitjes eshte i detyrueshem.',
            'type_of_sale.string' => 'Lloji i shitjes duhet te jete tekst.',

            'property_type.required' => 'Lloji i prones eshte i detyrueshem.',
            'property_type.string' => 'Lloji i prones duhet te jete tekst.',

            'property_category.required' => 'Kategoria e prones eshte e detyrueshme.',
            'property_category.string' => 'Kategoria e prones duhet te jete tekst.',

            'city.required' => 'Qyteti eshte i detyrueshem.',
            'city.string' => 'Qyteti duhet te jete tekst.',

            'street.required' => 'Rruga eshte e detyrueshme.',
            'street.string' => 'Rruga duhet te jete tekst.',

            'surface.required' => 'Siperfaqja eshte e detyrueshme.',
            'surface.numeric' => 'Siperfaqja duhet te jete numer.',

            'price.required' => 'Cmimi eshte i detyrueshem.',
            'price.numeric' => 'Cmimi duhet te jete numer.',

            'currency.required' => 'Monedha eshte e detyrueshme.',
            'currency.string' => 'Monedha duhet te jete tekst.',

            'description.string' => 'Pershkrimi duhet te jete tekst.',

            'total_rooms.numeric' => 'Numri i dhomave duhet te jete numer.',
            'total_bathrooms.numeric' => 'Numri i banjove duhet te jete numer.',
            'total_balconies.numeric' => 'Numri i ballkoneve duhet te jete numer.',

            'floor_number.numeric' => 'Numri i katit duhet te jete numer.',
            'total_floors.numeric' => 'Numri total i kateve duhet te jete numer.',

            'year_built.numeric' => 'Viti i ndertimit duhet te jete numer.',

            'latitude.required' => 'Vendndodhja eshte e detyrueshme.',
            'latitude.numeric' => 'Latitude duhet te jete numer.',

            'longitude.required' => 'Vendndodhja eshte e detyrueshme.',
            'longitude.numeric' => 'Longitude duhet te jete numer.',
        ];
    }

}
