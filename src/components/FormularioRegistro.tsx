import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface FormData {
  nombre: string;
  correo: string;
  contrasena: string;
}

interface FormErrors {
  nombre: string;
  correo: string;
  contrasena: string;
}

interface FormValidation {
  nombre: boolean;
  correo: boolean;
  contrasena: boolean;
}

const FormularioRegistro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const [isValid, setIsValid] = useState<FormValidation>({
    nombre: false,
    correo: false,
    contrasena: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    nombre: false,
    correo: false,
    contrasena: false
  });

  useEffect(() => {
    validateField('nombre', formData.nombre);
    validateField('correo', formData.correo);
    validateField('contrasena', formData.contrasena);
  }, [formData]);

  const validateField = (field: keyof FormData, value: string) => {
    let error = '';
    let valid = false;

    switch (field) {
      case 'nombre':
        if (value.length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = 'El nombre solo puede contener letras y espacios';
        } else {
          valid = true;
        }
        break;

      case 'correo':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'El correo electrónico es requerido';
        } else if (!emailRegex.test(value)) {
          error = 'Ingresa un correo electrónico válido';
        } else {
          valid = true;
        }
        break;

      case 'contrasena':
        if (value.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Debe incluir mayúsculas, minúsculas y números';
        } else {
          valid = true;
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    setIsValid(prev => ({
      ...prev,
      [field]: valid
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputBlur = (field: keyof FormData) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedFields({
      nombre: true,
      correo: true,
      contrasena: true
    });
    const isFormValid = isValid.nombre && isValid.correo && isValid.contrasena;
    
    if (isFormValid) {
      alert('¡Formulario enviado exitosamente!\n\n' + 
            `Nombre: ${formData.nombre}\n` +
            `Correo: ${formData.correo}\n` +
            `Contraseña: ${'*'.repeat(formData.contrasena.length)}`);
    }
  };

  const getInputClass = (field: keyof FormData) => {
    if (!touchedFields[field]) return 'form-control';
    return `form-control ${isValid[field] ? 'is-valid' : 'is-invalid'}`;
  };

  const getValidationIcon = (field: keyof FormData) => {
    if (!touchedFields[field] || !formData[field]) return null;
    return isValid[field] 
      ? <CheckCircle2 style={{ color: '#10B981' }} size={20} />
      : <AlertCircle style={{ color: '#EF4444' }} size={20} />;
  };

  const isFormComplete = isValid.nombre && isValid.correo && isValid.contrasena;

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ 
           background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
           fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
         }}>
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4">
          <div className="card border-0 shadow-lg" 
               style={{ 
                 borderRadius: '20px',
                 background: 'rgba(255, 255, 255, 0.98)',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
               }}>
            <div className="card-body p-5" style={{ padding: '3rem !important' }}>
              <div className="text-center mb-4">
                <div className="mb-3">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                  }}>
                    <CheckCircle2 style={{ color: 'white' }} size={28} />
                  </div>
                </div>
                <h2 className="fw-bold mb-2" style={{ 
                  color: '#1E293B', 
                  fontSize: '1.75rem',
                  letterSpacing: '-0.025em'
                }}>
                  Crear Cuenta
                </h2>
                <p style={{ 
                  color: '#64748B', 
                  fontSize: '0.95rem',
                  fontWeight: '400'
                }}>
                  Completa tus datos para comenzar
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Campo Nombre */}
                <div className="mb-4">
                  <label htmlFor="nombre" className="form-label fw-semibold mb-2" style={{ 
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    Nombre completo
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className={getInputClass('nombre')}
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu nombre completo"
                      style={{ 
                        paddingRight: '45px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        border: '2px solid #E2E8F0',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3B82F6';
                        e.target.style.backgroundColor = '#FFFFFF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        handleInputBlur('nombre');
                        if (!isValid.nombre && touchedFields.nombre) {
                          e.target.style.borderColor = '#EF4444';
                          e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                        } else if (isValid.nombre) {
                          e.target.style.borderColor = '#10B981';
                          e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                        } else {
                          e.target.style.borderColor = '#E2E8F0';
                          e.target.style.backgroundColor = '#F8FAFC';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    <div className="position-absolute" 
                        style={{ right: '15px', top: '50%', transform: 'translateY(-50%)' }}>
                      {getValidationIcon('nombre')}
                    </div>
                  </div>
                  {touchedFields.nombre && errors.nombre && (
                    <div className="mt-2">
                      <small style={{ color: '#EF4444', fontSize: '0.8rem' }}>
                        {errors.nombre}
                      </small>
                    </div>
                  )}
                  {touchedFields.nombre && isValid.nombre && (
                    <div className="mt-2">
                      <small style={{ color: '#10B981', fontSize: '0.8rem' }}>
                        ✓ Nombre válido
                      </small>
                    </div>
                  )}
                </div>

                {/* Campo Correo */}
                <div className="mb-4">
                  <label htmlFor="correo" className="form-label fw-semibold mb-2" style={{ 
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    Correo electrónico
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className={getInputClass('correo')}
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      placeholder="ejemplo@correo.com"
                      style={{ 
                        paddingRight: '45px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        border: '2px solid #E2E8F0',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3B82F6';
                        e.target.style.backgroundColor = '#FFFFFF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        handleInputBlur('correo');
                        if (!isValid.correo && touchedFields.correo) {
                          e.target.style.borderColor = '#EF4444';
                          e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                        } else if (isValid.correo) {
                          e.target.style.borderColor = '#10B981';
                          e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                        } else {
                          e.target.style.borderColor = '#E2E8F0';
                          e.target.style.backgroundColor = '#F8FAFC';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    <div className="position-absolute" 
                        style={{ right: '15px', top: '50%', transform: 'translateY(-50%)' }}>
                      {getValidationIcon('correo')}
                    </div>
                  </div>
                  {touchedFields.correo && errors.correo && (
                    <div className="mt-2">
                      <small style={{ color: '#EF4444', fontSize: '0.8rem' }}>
                        {errors.correo}
                      </small>
                    </div>
                  )}
                  {touchedFields.correo && isValid.correo && (
                    <div className="mt-2">
                      <small style={{ color: '#10B981', fontSize: '0.8rem' }}>
                        ✓ Correo electrónico válido
                      </small>
                    </div>
                  )}
                </div>

                {/* Campo Contraseña */}
                <div className="mb-4">
                  <label htmlFor="contrasena" className="form-label fw-semibold mb-2" style={{ 
                    color: '#374151',
                    fontSize: '0.875rem'
                  }}>
                    Contraseña
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={getInputClass('contrasena')}
                      id="contrasena"
                      name="contrasena"
                      value={formData.contrasena}
                      onChange={handleInputChange}
                      placeholder="Mínimo 8 caracteres"
                      style={{ 
                        paddingRight: '80px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        border: '2px solid #E2E8F0',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3B82F6';
                        e.target.style.backgroundColor = '#FFFFFF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        handleInputBlur('contrasena');
                        if (!isValid.contrasena && touchedFields.contrasena) {
                          e.target.style.borderColor = '#EF4444';
                          e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                        } else if (isValid.contrasena) {
                          e.target.style.borderColor = '#10B981';
                          e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                        } else {
                          e.target.style.borderColor = '#E2E8F0';
                          e.target.style.backgroundColor = '#F8FAFC';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    <div className="position-absolute d-flex align-items-center gap-2" 
                        style={{ right: '15px', top: '50%', transform: 'translateY(-50%)' }}>
                      <button
                        type="button"
                        className="btn p-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ 
                          border: 'none', 
                          background: 'none',
                          color: '#64748B',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#3B82F6'}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#64748B'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {getValidationIcon('contrasena')}
                    </div>
                  </div>
                  {touchedFields.contrasena && errors.contrasena && (
                    <div className="mt-2">
                      <small style={{ color: '#EF4444', fontSize: '0.8rem' }}>
                        {errors.contrasena}
                      </small>
                    </div>
                  )}
                  {touchedFields.contrasena && isValid.contrasena && (
                    <div className="mt-2">
                      <small style={{ color: '#10B981', fontSize: '0.8rem' }}>
                        ✓ Contraseña segura
                      </small>
                    </div>
                  )}
                </div>

                {/* Indicador de fortaleza de contraseña */}
                {formData.contrasena && (
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small style={{ color: '#64748B', fontSize: '0.8rem' }}>
                        Fortaleza de la contraseña
                      </small>
                      <small className="fw-bold" style={{
                        color: isValid.contrasena ? '#10B981' : 
                              formData.contrasena.length >= 4 ? '#F59E0B' : '#EF4444',
                        fontSize: '0.8rem'
                      }}>
                        {isValid.contrasena ? 'Fuerte' : 
                        formData.contrasena.length >= 4 ? 'Media' : 'Débil'}
                      </small>
                    </div>
                    <div className="progress" style={{ 
                      height: '8px', 
                      borderRadius: '4px',
                      backgroundColor: '#E2E8F0'
                    }}>
                      <div 
                        className="progress-bar"
                        style={{ 
                          width: `${isValid.contrasena ? 100 : formData.contrasena.length >= 4 ? 60 : 30}%`,
                          transition: 'all 0.3s ease',
                          backgroundColor: isValid.contrasena ? '#10B981' : 
                                        formData.contrasena.length >= 4 ? '#F59E0B' : '#EF4444',
                          borderRadius: '4px'
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Botón de envío */}
                <button
                  type="submit"
                  className="btn w-100 fw-bold text-white"
                  style={{
                    height: '52px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '0.95rem',
                    letterSpacing: '0.025em',
                    transition: 'all 0.3s ease',
                    background: isFormComplete 
                      ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' 
                      : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                    boxShadow: isFormComplete 
                      ? '0 10px 25px rgba(59, 130, 246, 0.3)' 
                      : '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transform: isFormComplete ? 'translateY(-1px)' : 'none',
                    cursor: isFormComplete ? 'pointer' : 'not-allowed'
                  }}
                  disabled={!isFormComplete}
                  onMouseEnter={(e) => {
                    if (isFormComplete) {
                      const target = e.target as HTMLButtonElement;
                      target.style.transform = 'translateY(-2px)';
                      target.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormComplete) {
                      const target = e.target as HTMLButtonElement;
                      target.style.transform = 'translateY(-1px)';
                      target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
                    }
                  }}
                >
                  {isFormComplete ? 'Crear mi cuenta' : 'Completa todos los campos'}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0" style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  ¿Ya tienes cuenta? 
                  <a href="#" className="text-decoration-none fw-medium ms-1" style={{
                    color: '#3B82F6',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#1D4ED8')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#3B82F6')}>
                    Inicia sesión
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioRegistro;