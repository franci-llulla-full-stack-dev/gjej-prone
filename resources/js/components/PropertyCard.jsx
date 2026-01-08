import React from 'react';
import { Card, CardContent, CardActions, Button, Chip, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BalconyIcon from '@mui/icons-material/Balcony';
import PersonIcon from '@mui/icons-material/Person';

const PropertyCard = ({ property, onEdit, onView, onDelete, onVerify, onRestore, onPermanentDelete, isDeleted }) => {
    return (
        <Card
            sx={{
                display: 'grid',
                gridTemplateRows: '1fr auto auto',
                height: '100%',
                boxShadow: 3,

                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease'
                }
            }}
        >
            {/* Content - zggjerohet */}
            <CardContent sx={{ display: 'grid', gap: 1.5, pb: 1 }}>
                {/* Pronari */}
                {property.owner && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1,
                        bgcolor: 'grey.100',
                        borderRadius: 1
                    }}>
                        <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" fontWeight="medium" noWrap>
                            {property.owner.name} {property.owner.surname}
                        </Typography>
                    </Box>
                )}

                {/* Chips për Shërbimet dhe Statusin */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, minHeight: 32 }}>
                    <Chip
                        label={property.type_of_sale === 'sale' ? 'Shitje' : 'Qira'}
                        color={property.type_of_sale === 'sale' ? 'primary' : 'secondary'}
                        size="small"
                    />
                    {Boolean(property.verified) ? (
                        <Chip label="E Verifikuar" color="success" size="small" />
                    ) : (
                        <Chip label="E Paverifikuar" color="error" size="small" />
                    )}
                    {Boolean(property.sold) && (
                        <Chip label="E Shitur" color="error" size="small" />
                    )}

                    {/* Shërbimet në Pritje */}
                    {(Boolean(property.virtual_tour) && !Boolean(property.virtual_tour_done)) && (
                        <Chip label="Tur Virtual" color="info" size="small" variant="outlined" />
                    )}
                    {(Boolean(property.rivleresim) && !Boolean(property.rivleresim_done)) && (
                        <Chip label="Rivlerësim" color="info" size="small" variant="outlined" />
                    )}
                    {(Boolean(property.combo_package) && !(Boolean(property.rivleresim_done) && Boolean(property.virtual_tour_done))) && (
                        <Chip label="Paketë Kombinuar" color="info" size="small" variant="outlined" />
                    )}

                    {/* Shërbimet e Kryera */}
                    {(Boolean(property.virtual_tour) && Boolean(property.virtual_tour_done)) && (
                        <Chip label="✓ Tur Virtual" color="success" size="small" />
                    )}
                    {(Boolean(property.rivleresim) && Boolean(property.rivleresim_done)) && (
                        <Chip label="✓ Rivlerësim" color="success" size="small" />
                    )}
                </Box>

                {/* Lloji i Pronës & Kategoria */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HomeIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                        {property.property_type} - {property.property_category}
                    </Typography>
                </Box>

                {/* Vendndodhja */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {property.street}, {property.city}
                    </Typography>
                </Box>

                {/* Çmimi */}
                <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                >
                    {property.price ? `${property.price} ${property.currency}` : 'Çmimi N/A'}
                </Typography>

                {/* Detajet e Pronës - Grid kompakt */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                    bgcolor: 'grey.50',
                    p: 1.5,
                    borderRadius: 1,
                    minHeight: 80
                }}>
                    {property.surface && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <SquareFootIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{property.surface} m²</Typography>
                        </Box>
                    )}
                    {property.total_rooms && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <BedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{property.total_rooms} dhoma</Typography>
                        </Box>
                    )}
                    {property.total_bathrooms && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <BathtubIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{property.total_bathrooms} banjo</Typography>
                        </Box>
                    )}
                    {property.total_balconies && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <BalconyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{property.total_balconies} ballkone</Typography>
                        </Box>
                    )}
                </Box>

                {/* Informacion Shtesë - fiksuar në fund */}
                <Box sx={{ minHeight: 24, display: 'flex', alignItems: 'center' }}>
                    {(property.floor_number || property.total_floors || property.year_built) && (
                        <Typography variant="caption" color="text.secondary">
                            {property.floor_number && `Kati ${property.floor_number}`}
                            {property.total_floors && `/${property.total_floors}`}
                            {property.year_built && ` • Ndërtuar: ${property.year_built}`}
                        </Typography>
                    )}
                </Box>
            </CardContent>

            {/* Butoni Shiko - fiksuar në pozitë */}
            <CardActions sx={{ px: 2, pt: 0, pb: 1 }}>
                <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    onClick={() => onView(property)}
                    sx={{ fontWeight: 600 }}
                >
                    Shiko Detajet
                </Button>
            </CardActions>

            {/* Veprimet - fiksuar në fund */}
            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                {!isDeleted ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, width: '100%' }}>
                        <Button size="small" variant="outlined" onClick={() => onEdit(property)}>
                            Ndrysho
                        </Button>
                        <Button size="small" color="error" variant="outlined" onClick={() => onDelete(property)}>
                            Fshi
                        </Button>
                        <Button
                            size="small"
                            color={property.verified ? "warning" : "success"}
                            variant="outlined"
                            onClick={() => onVerify(property)}
                        >
                            {property.verified ? 'Hiq' : 'Verifiko'}
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, width: '100%' }}>
                        <Button size="small" color="primary" variant="outlined" onClick={() => onRestore(property)}>
                            Restauro
                        </Button>
                        <Button size="small" color="error" variant="outlined" onClick={() => onPermanentDelete(property)}>
                            Fshi Përgjithmonë
                        </Button>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
};

export default PropertyCard;
