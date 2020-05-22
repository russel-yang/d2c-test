module.exports = function(migration) {
  // add fields so contentful user can set CTA messages
  const hero = migration.editContentType('hero');

  hero
    .createField('ctaMessageIcon')
    .name('CTA Message Icon')
    .type('Symbol')
    .validations([{ in: ['SaleSVG', 'ClockSVG', 'CheckCircleOutlineSVG'] }]);

  hero.changeFieldControl('ctaMessageIcon', 'dropdown', 'symbol', {
    helpText:
      'Check this link to see icons: https://t2gp-storybook.s3-us-west-1.amazonaws.com/index.html?path=/story/svg-icons-icons--all'
  });

  hero
    .createField('ctaMessage')
    .name('CTA Message')
    .type('Symbol')
    .localized(true);

  hero
    .createField('isPrepend')
    .name('CTA Message Placement')
    .type('Boolean');

  hero.changeFieldControl('isPrepend', 'builtin', 'boolean', {
    trueLabel: 'Prepend to Launch-Message',
    falseLabel: 'Append to Launch-Message'
  });
};
