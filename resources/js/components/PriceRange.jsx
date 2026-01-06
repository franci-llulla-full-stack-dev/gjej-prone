import { Range } from 'react-range';
import { useState } from 'react';

const STEP = 1; // step in m²
const MIN = 0;
const MAX = 5000000; // maximum surface you want to allow

export default function PriceRange({ data, setData, errors }) {
    const [values, setValues] = useState([data.price || MIN, data.price_2 || MAX]);

    const handleChange = (newValues) => {
        setValues(newValues);
        setData('price', newValues[0]);
        setData('price_2', newValues[1]);
    };

    return (
        <div className="mb-4">
            <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={values}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-2 w-full bg-gray-300 rounded relative"
                        style={{ ...props.style }}
                    >
                        <div
                            className="absolute h-2 bg-blue-500 rounded"
                            style={{
                                left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                                width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        className="h-5 w-5 bg-blue-600 rounded-full border-2 border-white shadow-md"
                    />
                )}
            />

            <div className="flex justify-between text-sm mt-1">
                <span>{values[0].toLocaleString()} {data.currency ?? ''}</span>
                <span>{values[1].toLocaleString()} {data.currency ?? ''}</span>
            </div>

            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
            {errors.price_2 && <p className="text-sm text-red-500 mt-1">{errors.price_2}</p>}
        </div>
    );
}
