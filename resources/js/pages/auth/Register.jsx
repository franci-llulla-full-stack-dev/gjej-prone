import backgroundImage from '../../media/background.jpeg';
import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Link, useForm } from '@inertiajs/react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import '../../../css/register.css';


const Register = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [termsError, setTermsError] = useState('');
    const userTypeOptions = [
        { value: 'individual', label: 'Individ' },
        { value: 'agency', label: 'Agjenci' },
        { value: 'bank', label: 'Banke' },
    ];
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState(null);
    const [animateStep1, setAnimateStep1] = useState(false);
    useEffect(() => {
        if(step === 1) setAnimateStep1(true);
    }, [step]);
    useEffect(() => {
        if (!userType) return;

        if (userType.value === 'buyer') {
            const option = { value: 'user', label: 'Klient' };
            setFilteredOptions([option]);
            setSelectedOption(option);
            if (data.user_type !== 'user') setData('user_type', 'user');
        } else if (userType.value === 'seller') {
            setFilteredOptions(userTypeOptions);
            const option = userTypeOptions.find(opt => opt.value === data.user_type) || null;
            setSelectedOption(option);
        }
    }, [userType]);
    const { data, setData, post, errors } = useForm({
        name: '',
        surname: '',
        email: '',
        phone_number: '',
        birth_date: null,
        company_name: '',
        password: '',
        password_confirmation: '',
        user_type: '',
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formatted = formatDate(date);// YYYY-MM-DD
        setData('birth_date', formatted);
    };
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!acceptedTerms) {
            setTermsError('Ju duhet të pranoni Termat dhe Kushtet dhe Politikën e Privatësisë për të vazhduar.');
            return;
        }
        post('/register');
    };
    const handleSelectType = (option) => {
        setUserType(option);
        setStep(2);
    };

    const ErrorText = ({ field }) => {
        const err = errors?.[field];
        if (!err) return null;
        // errors sometimes come as array
        const text = Array.isArray(err) ? err.join(' ') : err;
        return <p className="text-red-500 text-sm mt-1">{text}</p>;
    };

    return (
        <div className="overflow-hidden">
            <div className="min-h-screen grid">
                <main className="">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        >
                            <div className="absolute inset-0 bg-black/40"></div> {/* dark overlay for text readability */}
                        </div>

                        <div className="relative z-10 grid grid-cols-1 items-center justify-center min-h-[70vh] px-6 pt-10 text-center">
                            <div className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 ${
                                animateStep1 ? 'translate-x-0 opacity-100' : 'translate-x-50 opacity-0'}`
                            }>
                                {/* Step 1 */}
                                {step === 1 && (
                                    <div className="p-8 flex flex-col space-y-6">
                                        <h2 className="text-2xl font-bold text-center">Mirë se vini!</h2>
                                        <p className="text-gray-700 text-center">
                                            Zgjidhni llojin e përdoruesit për të filluar regjistrimin:
                                        </p>

                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { value: 'seller', label: 'Dua të Shes Pronën Time' },
                                                { value: 'buyer', label: 'Dua të Blej Pronë' },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => handleSelectType(option)}
                                                    className={`px-4 py-3 rounded-xl shadow-md font-medium transition
                                            ${
                                                        userType && userType.value === option.value
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-100 text-gray-800 hover:bg-blue-400 hover:text-white'
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2 */}
                                {step === 2 && (
                                    <div className="p-8 flex flex-col space-y-4 transform transition-all duration-700 translate-x-0 opacity-100">
                                        <h2 className="text-2xl font-bold text-center">Vazhdoni me regjistrimin</h2>
                                        <p className="text-gray-700 text-center mb-4">
                                            Ju keni zgjedhur: <strong>{userType.label}</strong>
                                        </p>

                                        <div className="flex flex-col space-y-3">
                                            {userType?.value !== 'buyer' && (
                                                <Select
                                                    name="user_type"
                                                    value={selectedOption}
                                                    onChange={(selected) => {
                                                        setSelectedOption(selected);
                                                        setData('user_type', selected.value);
                                                    }}
                                                    options={filteredOptions}
                                                    placeholder="Selekto Tipin"
                                                    classNamePrefix="react-select"
                                                    styles={{
                                                        control: (provided) => ({
                                                            ...provided,
                                                            backgroundColor: 'transparent',
                                                            borderColor: '#d1d5db',
                                                        }),
                                                        menu: (provided) => ({
                                                            ...provided,
                                                            backgroundColor: 'white',
                                                        }),
                                                        singleValue: (provided) => ({
                                                            ...provided,
                                                            color: '#111827',
                                                        }),
                                                        placeholder: (provided) => ({
                                                            ...provided,
                                                            color: '#6b7280',
                                                        }),
                                                    }}
                                                />
                                            )}
                                            <ErrorText field="user_type" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Emri"
                                                value={data.name}
                                                onChange={handleChange}
                                                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <ErrorText field="name" />
                                            <input
                                                name="surname"
                                                value={data.surname}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Mbiemri"
                                                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <ErrorText field="surname" />
                                            <input
                                                name="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Email"
                                                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <ErrorText field="email" />

                                                <PhoneInput
                                                    international
                                                    defaultCountry="AL"
                                                    value={data.phone_number}
                                                    onChange={(value) => setData('phone_number', value)}
                                                    className="phone-input px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                <ErrorText field="phone_number" />

                                                <DatePicker
                                                    selected={selectedDate}
                                                    onChange={handleDateChange}
                                                    placeholderText="Datëlindja"
                                                    className="w-full p-2 rounded-md border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    dateFormat="MM/dd/yyyy"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />

                                            <ErrorText field="birth_date" />
                                            {['agency', 'bank'].includes(userType.value) && (
                                                <div>
                                                    <input
                                                        name="company_name"
                                                        type="text"
                                                        value={data.company_name}
                                                        onChange={handleChange}
                                                        placeholder="Emri i kompanisë"
                                                        className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    />
                                                    <ErrorText field="company_name" />
                                                </div>
                                            )}
                                            <input
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={handleChange}
                                                placeholder="Fjalëkalimi"
                                                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <ErrorText field="password" />
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={handleChange}
                                                placeholder="Konfirmo Fjalëkalimin"
                                                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <div className="flex">
                                                <input
                                                    type="checkbox"
                                                    checked={acceptedTerms}
                                                    onChange={(e) => {
                                                        setAcceptedTerms(e.target.checked);
                                                        if (e.target.checked) setTermsError('');
                                                    }}
                                                    className="mt-1 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                                                />
                                                <div className="p-2">
                                                    <p className="text-xs">
                                                        Duke krijuar llogarinë, pranoj <Link href="/terms">Termat dhe Kushtet</Link>

                                                    </p>
                                                    <p className="text-xs">
                                                        dhe <Link href="/privacy">Politikën e Privatësisë</Link>.
                                                    </p>
                                                    {termsError && <p className="text-red-500">{termsError}</p>}
                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-4">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                                            >
                                                Kthehu Mbrapa
                                            </button>
                                            <button
                                                type="submit"
                                                onClick={handleSubmit}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                            >
                                                Vazhdo
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
            </div>
        </div>
    );
};

export default Register;
