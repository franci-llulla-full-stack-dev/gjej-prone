import { Range } from 'react-range';
import { useState } from 'react';

const STEP = 1; // step in m²
const MIN = 0;
const MAX = 1000; // maximum surface you want to allow

export default function SurfaceRange({ data, setData, errors }) {
    const [values, setValues] = useState([data.surface || MIN, data.surface_2 || MAX]);

    const handleChange = (newValues) => {
        setValues(newValues);
        setData('surface', newValues[0]);
        setData('surface_2', newValues[1]);
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
                <span>{values[0]} m²</span>
                <span>{values[1]} m²</span>
            </div>

            {errors.surface && <p className="text-sm text-red-500 mt-1">{errors.surface}</p>}
            {errors.surface_2 && <p className="text-sm text-red-500 mt-1">{errors.surface_2}</p>}
        </div>
    );
}
