import backgroundImage from '../../media/background.jpeg';
import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Link, useForm } from '@inertiajs/react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import '../../../css/register.css';

const Regjistrohu = () => {
    const [pranimiKushtet, setPranimiKushtet] = useState(false);
    const [gabimKushtet, setGabimKushtet] = useState('');
    const opsionetLlojiPerdoruesi = [
        { value: 'individual', label: 'Individ' },
        { value: 'agency', label: 'Agjenci' },
        { value: 'bank', label: 'Bankë' },
    ];
    const [opsionetFiltruara, setOpsionetFiltruara] = useState([]);
    const [opsioniZgjedhur, setOpsioniZgjedhur] = useState(null);
    const [hapi, setHapi] = useState(1);
    const [llojiPerdoruesi, setLlojiPerdoruesi] = useState(null);
    const [animacionHapi1, setAnimacionHapi1] = useState(false);
    useEffect(() => {
        if (hapi === 1) setAnimacionHapi1(true);
    }, [hapi]);
    useEffect(() => {
        if (!llojiPerdoruesi) return;

        if (llojiPerdoruesi.value === 'buyer') {
            const opsion = { value: 'user', label: 'Klient' };
            setOpsionetFiltruara([opsion]);
            setOpsioniZgjedhur(opsion);
            if (data.user_type !== 'user') setData('user_type', 'user');
        } else if (llojiPerdoruesi.value === 'seller') {
            setOpsionetFiltruara(opsionetLlojiPerdoruesi);
            const opsion = opsionetLlojiPerdoruesi.find(opt => opt.value === data.user_type) || null;
            setOpsioniZgjedhur(opsion);
        }
    }, [llojiPerdoruesi]);
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
    const [dataZgjedhur, setDataZgjedhur] = useState(null);
    const ndryshoDaten = (date) => {
        setDataZgjedhur(date);
        const formatuar = formatoDaten(date); // YYYY-MM-DD
        setData('birth_date', formatuar);
    };
    const ndryshoTeDhenat = (e) => {
        setData(e.target.name, e.target.value);
    };
    const formatoDaten = (date) => {
        const viti = date.getFullYear();
        const muaji = String(date.getMonth() + 1).padStart(2, '0'); // Muajt fillojnë nga 0
        const dita = String(date.getDate()).padStart(2, '0');
        return `${viti}-${muaji}-${dita}`;
    };
    const dergoFormen = (e) => {
        e.preventDefault();
        if (!pranimiKushtet) {
            setGabimKushtet('Ju duhet të pranoni Termat dhe Kushtet dhe Politikën e Privatësisë për të vazhduar.');
            return;
        }
        post('/register');
    };
    const zgjedhLlojin = (opsion) => {
        setLlojiPerdoruesi(opsion);
        setHapi(2);
    };

    const TekstGabimi = ({ fusha }) => {
        const gabim = errors?.[fusha];
        if (!gabim) return null;
        const tekst = Array.isArray(gabim) ? gabim.join(' ') : gabim;
        return <p className="text-red-500 text-sm mt-1">{tekst}</p>;
    };

    return (
        <div className="overflow-hidden">
            <div className="min-h-screen grid">
                <main className="">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div className="absolute inset-0 bg-black/40"></div> {/* mbulesë e errët për lexueshmëri */}
                    </div>

                    <div className="relative z-10 grid grid-cols-1 place-items-center min-h-[70vh] px-6 pt-10 text-center">
                        <div className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 md:w-5/12 ${
                            animacionHapi1 ? 'translate-x-0 opacity-100' : 'translate-x-50 opacity-0'}`
                        }>
                            {/* Hapi 1 */}
                            {hapi === 1 && (
                                <div className="p-8 grid grid-cols space-y-6">
                                    <h2 className="text-2xl font-bold text-center">Mirë se vini!</h2>
                                    <p className="text-gray-700 text-center">
                                        Zgjidhni llojin e përdoruesit për të filluar regjistrimin:
                                    </p>

                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { value: 'seller', label: 'Dua të Shes Pronën Time' },
                                            { value: 'buyer', label: 'Dua të Blej Pronë' },
                                        ].map((opsion) => (
                                            <button
                                                key={opsion.value}
                                                type="button"
                                                onClick={() => zgjedhLlojin(opsion)}
                                                className={`px-4 py-3 rounded-xl shadow-md font-medium transition
                                            ${
                                                    llojiPerdoruesi && llojiPerdoruesi.value === opsion.value
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-100 text-gray-800 hover:bg-blue-400 hover:text-white'
                                                }`}
                                            >
                                                {opsion.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Hapi 2 */}
                            {hapi === 2 && (
                                <div className="p-8 flex flex-col space-y-4 transform transition-all duration-700 translate-x-0 opacity-100">
                                    <h2 className="text-2xl font-bold text-center">Vazhdoni me regjistrimin</h2>
                                    <p className="text-gray-700 text-center mb-4">
                                        Ju keni zgjedhur: <strong>{llojiPerdoruesi.label}</strong>
                                    </p>

                                    <div className="flex flex-col space-y-3">
                                        {llojiPerdoruesi?.value !== 'buyer' && (
                                            <Select
                                                name="user_type"
                                                value={opsioniZgjedhur}
                                                onChange={(zgjedhur) => {
                                                    setOpsioniZgjedhur(zgjedhur);
                                                    setData('user_type', zgjedhur.value);
                                                }}
                                                options={opsionetFiltruara}
                                                placeholder="Zgjidh Tipin"
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
                                        <TekstGabimi fusha="user_type" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Emri"
                                            value={data.name}
                                            onChange={ndryshoTeDhenat}
                                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <TekstGabimi fusha="name" />
                                        <input
                                            name="surname"
                                            value={data.surname}
                                            onChange={ndryshoTeDhenat}
                                            type="text"
                                            placeholder="Mbiemri"
                                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <TekstGabimi fusha="surname" />
                                        <input
                                            name="email"
                                            value={data.email}
                                            onChange={ndryshoTeDhenat}
                                            type="text"
                                            placeholder="Email"
                                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <TekstGabimi fusha="email" />

                                        <PhoneInput
                                            international
                                            defaultCountry="AL"
                                            value={data.phone_number}
                                            onChange={(vlera) => setData('phone_number', vlera)}
                                            className="phone-input px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <TekstGabimi fusha="phone_number" />

                                        <DatePicker
                                            selected={dataZgjedhur}
                                            onChange={ndryshoDaten}
                                            placeholderText="Datëlindja"
                                            className="w-full p-2 rounded-md border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            dateFormat="MM/dd/yyyy"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />

                                        <TekstGabimi fusha="birth_date" />
                                        {['agency', 'bank'].includes(llojiPerdoruesi.value) && (
                                            <div>
                                                <input
                                                    name="company_name"
                                                    type="text"
                                                    value={data.company_name}
                                                    onChange={ndryshoTeDhenat}
                                                    placeholder="Emri i Kompanisë"
                                                    className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                <TekstGabimi fusha="company_name" />
                                            </div>
                                        )}
                                        <input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={ndryshoTeDhenat}
                                            placeholder="Fjalëkalimi"
                                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <TekstGabimi fusha="password" />
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={ndryshoTeDhenat}
                                            placeholder="Konfirmo Fjalëkalimin"
                                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <div className="flex">
                                            <input
                                                type="checkbox"
                                                checked={pranimiKushtet}
                                                onChange={(e) => {
                                                    setPranimiKushtet(e.target.checked);
                                                    if (e.target.checked) setGabimKushtet('');
                                                }}
                                                className="mt-1 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                                            />
                                            <div className="p-2">
                                                <p className="text-xs">
                                                    Duke krijuar llogarinë, pranoj <Link href="/terms">Termat dhe Kushtet</Link>

                                                    dhe <Link href="/privacy">Politikën e Privatësisë</Link>.
                                                </p>
                                                {gabimKushtet && <p className="text-red-500">{gabimKushtet}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => setHapi(1)}
                                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                                        >
                                            Kthehu Mbrapa
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={dergoFormen}
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

export default Regjistrohu;
