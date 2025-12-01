export function generateComponentButton(theme) {
    const { transition } = theme;
    return `/* === Component: Button === */
/* Variables communes à toutes les variantes */
:root {
  --btn-radius: 9999px;
  --btn-padding-y: 0.5rem;
  --btn-padding-x: 1rem;
  --transition-duration: ${transition.duration};
  --transition-type: ${transition.type};
}

/* Bouton générique pour la base visuelle */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--btn-padding-y) var(--btn-padding-x);
  border-radius: var(--btn-radius);
  border: none;
  cursor: pointer;
  font-family: var(--font-main);
  font-weight: 600;
  transition: background-color var(--transition-duration) var(--transition-type),
              transform var(--transition-duration) var(--transition-type),
              box-shadow var(--transition-duration) var(--transition-type);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variantes colorées */
.btn-primary {
  background-color: var(--color-primary);
  color: #fff;
}
.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.btn-success {
  background-color: var(--color-success);
  color: #000;
}
.btn-success:hover {
  background-color: var(--color-success-dark);
}

.btn-warning {
  background-color: var(--color-warning);
  color: #000;
}
.btn-warning:hover {
  background-color: var(--color-warning-dark);
}

.btn-danger {
  background-color: var(--color-danger);
  color: #fff;
}
.btn-danger:hover {
  background-color: var(--color-danger-dark);
}

`;
}
