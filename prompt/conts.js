export const yesNoOptions = [
  {
    value: 'yes',
    label: 'Sí',
  },
  {
    value: 'no',
    label: 'No',
  }
];

export const selectAction = {
  message: 'Elige la acción que quieras realizar',
  options: [
    {
      value: 'cancelProgram',
      label: 'Cancelar',
      hint: 'Salir del programa',
    },
    {
      value: 'cambiarTexto',
      label: 'Cambiar textos',
      hint: 'Actualiza los textos de la web',
    },
    {
      label: 'Añadir fotos a un portfolio',
      value: 'addPortfolioPhotos',
      hint: 'Añade fotos a un portfolio',
    },
    {
      value: 'subirCambios',
      label: 'Subir cambios',
      hint: 'Sube los cambios a la web para que sean visibles para todos',
    },
  ],
}